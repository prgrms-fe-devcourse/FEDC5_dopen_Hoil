import { ChannelPayload, getPostListByChannel } from '@/apis/post';
import { Post } from '@/apis/type';
import { POST_LIST } from '@/constants/queryKeys';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

interface PostListProps extends ChannelPayload {}

const PostList = ({ channelId, offset, limit }: PostListProps) => {
  const { data } = useQuery<Post[], AxiosError>([POST_LIST], async () => {
    return await getPostListByChannel({ channelId, offset, limit });
  });
  return (
    <div>{data?.map((post) => <span key={post._id}>{post.title}</span>)}</div>
  );
};

export default PostList;
