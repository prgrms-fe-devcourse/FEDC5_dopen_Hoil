import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { useMyPostList } from '@/hooks/usePost';

import PostListItem from '@/components/PostList/PostListItem';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';

const MyBoardList = () => {
  const navigate = useNavigate();
  const { data: myPostList = [], isLoading, isError } = useMyPostList();

  if (isLoading) {
    return <Box>로딩중입니다...</Box>;
  }

  if (isError) {
    return <Box>새로고침 해주세요...</Box>;
  }

  const onPostDetail = (id: string) => {
    navigate(`./${id}`);
  };

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
            onClick={() => onPostDetail(post._id)}
          />
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default MyBoardList;
