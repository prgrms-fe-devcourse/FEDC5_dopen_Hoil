import { Box, BoxProps } from '@chakra-ui/react';
import CommentForm from './CommentForm';
import CommentText from './CommentText';
import { TComment, User } from '@/apis/type';

interface CommentProps extends BoxProps {
  comments: TComment[];
  myInfo: User;
  _id: string;
}

const Comments = ({ comments, myInfo, _id, ...props }: CommentProps) => {
  return (
    <Box {...props} padding="0 20px">
      <Box pb="70px">
        {comments.map(({ _id, comment, author }) => (
          <CommentText
            key={_id}
            id={_id}
            comment={comment}
            author={author}
            username={myInfo.username}
          />
        ))}
      </Box>
      <Box
        pos="fixed"
        left="50%"
        bottom="0"
        transform="translateX(-50%)"
        width="100%"
        maxWidth="428px"
        p="10px 20px"
        zIndex="100"
        backgroundColor="white"
      >
        <CommentForm id={_id} image={myInfo.image} />
      </Box>
    </Box>
  );
};

export default Comments;
