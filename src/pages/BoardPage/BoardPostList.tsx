import PostList from '@/components/PostList';
import { DEFAULT_WIDTH } from '@/constants/style';
import styled from '@emotion/styled';

interface BoardPostListProps {
  channelId: string;
}

const BoardPostList = ({ channelId }: BoardPostListProps) => {
  return (
    <BoardPageBody>
      <PostList keyword="" channelId={channelId} />
    </BoardPageBody>
  );
};

const BoardPageBody = styled.div`
  width: ${DEFAULT_WIDTH};
  flex-grow: 1;
  margin-bottom: 50px;
  padding: 10px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default BoardPostList;
