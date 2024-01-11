import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { usePostDetail } from '@/hooks/usePost';
import { useMyInfo } from '@/hooks/useAuth';
import CommentForm from './CommentForm';
import CommentText from './CommentText';

const Comment = () => {
  const { postid = '' } = useParams();

  const { data, isLoading } = usePostDetail({ id: postid });
  const { data: myInfo } = useMyInfo();
  if (!data || isLoading) {
    return <Box>로딩중입니다...</Box>;
  }

  const { comments = [] } = data;
  return (
    <Box maxW="428px">
      <Box>
        {comments.map(({ _id, comment, author }) => (
          <CommentText
            key={_id}
            id={_id}
            comment={comment}
            author={author}
            username={myInfo ? myInfo.username : ''}
          />
        ))}
      </Box>
      <Box mt="30px">
        <CommentForm id={postid} image={myInfo ? myInfo.image : ''} />
      </Box>
    </Box>
  );
};

export default Comment;
