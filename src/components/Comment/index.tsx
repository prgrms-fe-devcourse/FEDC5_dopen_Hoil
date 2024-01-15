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
    <Box {...props}>
      <Box>
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
      <Box mt="30px" pos="sticky" bottom="0" zIndex="9">
        <CommentForm id={_id} image={myInfo.image} />
      </Box>
    </Box>
  );
};

export default Comments;
