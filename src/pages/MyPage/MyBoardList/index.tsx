import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { useMyInfo } from '@/hooks/useAuth';
import { useMyPostList } from '@/hooks/usePost';

import PostListItem from '@/components/PostList/PostListItem';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';

const MyBoardList = () => {
  const navigate = useNavigate();
  const { data: myInfo } = useMyInfo();
  const { data: postList = [] } = useMyPostList();

  if (!myInfo) {
    return;
  }

  const { timerChannelId } = JSON.parse(myInfo.fullName);
  const myPostList = postList.filter((post) => post.channel !== timerChannelId);

  const onPostDetail = (id: string) => {
    navigate(`./${id}`);
  };

  return (
    <Box>
      <PageHeader pageName="내가 작성한 게시글" />
      <Box padding="0 0 20px">
        {myPostList.length === 0 && (
          <Box textAlign="center" fontSize="14px" p="50px 0">
            작성한 게시글이 없습니다.
          </Box>
        )}
        {myPostList.map((post) => (
          <PostListItem
            key={post._id}
            title={JSON.parse(post.title).title}
            timeAgo={calculateTimeDiff(post.createdAt) || ''}
            username=""
            likeCount={post.likes.length}
            commentCount={post.comments.length}
            style={{ borderBottom: '1px solid' }}
            onClick={() => onPostDetail(post._id)}
          />
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default MyBoardList;
