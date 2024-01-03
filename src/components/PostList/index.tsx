import { ChannelPayload, getPostListByChannel } from '@/apis/post';
import { Post } from '@/apis/type';
import { TEST_CHANNEL_ID } from '@/constants/apiTest';
import { POST_LIST } from '@/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import PostListItem from './PostListItem';
import { StackDivider, StackProps, VStack } from '@chakra-ui/react';
import { DEFAULT_WIDTH } from '@/constants/style';
interface PostListProps extends ChannelPayload, StackProps {}

const PostList = ({
  channelId = TEST_CHANNEL_ID,
  offset = 3,
  limit,
  ...props
}: PostListProps) => {
  const { data } = useQuery<Post[], AxiosError>(
    [POST_LIST],
    async () => {
      return await getPostListByChannel({ channelId, offset, limit });
    },
    {
      refetchOnWindowFocus: false,
      meta: {
        errorMessage: '게시글 목록 가져올때 에러 발생하였습니다',
      },
    },
  );
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
