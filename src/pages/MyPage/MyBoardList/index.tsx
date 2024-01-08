import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { useMyBoardList } from '@/hooks/usePost';

import PostListItem from '@/components/PostList/PostListItem';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';

const MyBoardList = () => {
  const navigate = useNavigate();
  const { data: myPostList, isLoading } = useMyBoardList();

  if (isLoading) {
    return <Box>로딩중입니다...</Box>;
  }

  if (!myPostList) {
    return <Box>새로고침 해주세요....</Box>;
  }

  return (
    <Box>
      <PageHeader pageName="내가 작성한 게시글" />
      <Box padding="0 0 20px">
        {myPostList.map((post) => (
          <PostListItem
            key={post._id}
            title={post.title}
            timeAgo="2일 전"
            username=""
            likeCount={post.likes.length}
            commentCount={post.comments.length}
            style={{ borderBottom: '1px solid' }}
            onClick={() => navigate(`./${post._id}`)}
          />
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default MyBoardList;
