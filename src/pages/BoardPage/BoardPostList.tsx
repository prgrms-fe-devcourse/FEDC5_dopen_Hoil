import PostList from '@/components/PostList';
import { TEST_CHANNEL_ID } from '@/constants/apiTest';
import { DEFAULT_WIDTH } from '@/constants/style';
import styled from '@emotion/styled';

const BoardPostList = () => {
  return (
    <BoardPageBody>
      <PostList keyword="" channelId={TEST_CHANNEL_ID} />
    </BoardPageBody>
  );
};

const BoardPageBody = styled.div`
  width: ${DEFAULT_WIDTH};
  margin-bottom: 50px;
  padding: 10px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default BoardPostList;
