import { ChannelPayload, getPostListByChannel } from '@/apis/post';
import { Post } from '@/apis/type';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import PostListItem from './PostListItem';
import { Box, StackDivider, StackProps, VStack } from '@chakra-ui/react';
import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import { checkIsJson } from '@/utils/checkIsJson';
import { useNavigate } from 'react-router-dom';

interface PostListProps extends ChannelPayload, StackProps {
  keyword?: string;
}

const PostList = ({
  keyword,
  channelId,
  offset,
  limit,
  ...props
}: PostListProps) => {
  const { data } = useQuery<Post[], AxiosError>(
    [channelId],
    async () => {
      return await getPostListByChannel({ channelId, offset, limit });
    },
    {
      refetchOnWindowFocus: false,
      meta: {
        errorMessage: '게시글 목록 가져올때 에러 발생하였습니다',
      },
      select: (data) => {
        return keyword
          ? data.filter((post) => post.title.includes(keyword))
          : data;
      },
    },
  );
  const navigate = useNavigate();
  /* 어떤 예외사항이 더 있을지 생각해보겠습니다 */
  if (data && !data.length) {
    return (
      <Box
        margin="0 auto"
        padding={`0 ${DEFAULT_PAGE_PADDING}`}
        fontSize="1.2rem"
      >
        검색어와 일치하는 글이 없습니다
      </Box>
    );
  }

  return (
    <VStack w="100%" spacing={0} divider={<StackDivider />} {...props}>
      {data?.map((post) => (
        <PostListItem
          key={post._id}
          title={
            checkIsJson(post.title) ? JSON.parse(post.title).title : post.title
          }
          timeAgo={calculateTimeDiff(post.createdAt) || '날짜계산 불가'}
          username={post.author.username}
          likeCount={post.likes.length}
          commentCount={post.comments.length}
          onClick={() => navigate(`/board/${post.channel?.name}/${post._id}`)}
        />
      ))}
    </VStack>
  );
};

export default PostList;
