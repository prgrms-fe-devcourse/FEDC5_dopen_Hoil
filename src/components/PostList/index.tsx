import { ChannelPayload, getPostListByChannel } from '@/apis/post';
import { Post } from '@/apis/type';
import { TEST_CHANNEL_ID } from '@/constants/apiTest';
import { POST_LIST } from '@/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import PostListItem from './PostListItem';
import { StackDivider, VStack } from '@chakra-ui/react';
import { DEFAULT_WIDTH } from '@/constants/style';

interface PostListProps extends ChannelPayload {}

const PostList = ({
  channelId = TEST_CHANNEL_ID,
  offset,
  limit,
}: PostListProps) => {
  const { data } = useQuery<Post[], AxiosError>([POST_LIST], async () => {
    return await getPostListByChannel({ channelId, offset, limit });
  });
  return (
    <VStack w={DEFAULT_WIDTH} spacing={0} divider={<StackDivider />}>
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
