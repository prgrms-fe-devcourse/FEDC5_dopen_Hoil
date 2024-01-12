import { ChannelPayload, getPostListByChannel } from '@/apis/post';
import { Post } from '@/apis/type';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import PostListItem from './PostListItem';
import { Box, StackDivider, StackProps, VStack } from '@chakra-ui/react';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';

interface PostListProps extends ChannelPayload, StackProps {
  keyword: string;
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
      select: (data) => data.filter((post) => post.title.includes(keyword)),
    },
  );

  /* 어떤 예외사항이 더 있을지 생각해보겠습니다 */
  if (data && !data.length) {
    return (
      <Box w="100%" padding={`0 ${DEFAULT_PAGE_PADDING}`} fontSize="1.2rem">
        검색어와 일치하는 글이 없습니다
      </Box>
    );
  }

  return (
    <VStack w={DEFAULT_WIDTH} spacing={0} divider={<StackDivider />} {...props}>
      {data?.map((post) => (
        <PostListItem
          key={post._id}
          title={post.title}
          timeAgo="2일 전"
          username={post.author.username}
          likeCount={post.likes.length}
          commentCount={post.comments.length}
        />
      ))}
    </VStack>
  );
};

export default PostList;
