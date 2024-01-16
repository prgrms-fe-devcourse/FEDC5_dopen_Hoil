import { Box, BoxProps } from '@chakra-ui/react';
import CommentForm from './CommentForm';
import CommentText from './CommentText';
import { TComment, User } from '@/apis/type';
import { DEFAULT_PAGE_PADDING } from '@/constants/style';

interface CommentProps extends BoxProps {
  comments: TComment[];
  myInfo: User;
  _id: string;
}

const Comments = ({ comments, myInfo, _id, ...props }: CommentProps) => {
  return (
    <Box {...props} padding={`0 ${DEFAULT_PAGE_PADDING}`}>
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
      <Box
        pos="sticky"
        left="0"
        bottom="0"
        width="100%"
        maxWidth="428px"
        p="10px 0"
        zIndex="100"
        backgroundColor="white"
      >
        <CommentForm id={_id} image={myInfo.image} />
      </Box>
    </Box>
  );
};

export default Comments;
