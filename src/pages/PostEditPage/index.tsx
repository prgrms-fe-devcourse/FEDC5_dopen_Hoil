import { useLocation } from 'react-router-dom';

const PostEditPage = () => {
  const location = useLocation();

  return <div>{location.pathname} 글 작성 페이지</div>;
};

export default PostEditPage;
