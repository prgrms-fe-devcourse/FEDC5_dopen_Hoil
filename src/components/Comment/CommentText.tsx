import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { User } from '@/apis/type';
import { useDeleteComment } from '@/hooks/useComment';
import UserContentBlock from '../common/UserContentBlock';
import Confirm from '../common/Confirm';

interface CommentTextProps {
  id: string;
  comment: string;
  author: User;
  username: string;
}

const CommentText = ({ id, comment, author, username }: CommentTextProps) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const navigate = useNavigate();
  const deleteCommentMutate = useDeleteComment();
  const onConfirm = () => {
    deleteCommentMutate(id);
    setIsConfirm(false);
  };

  const onCancel = () => {
    setIsConfirm(false);
  };

  return (
    <Box p="10px 0" borderBottom="1px solid #D4D4D4">
      <UserContentBlock
        w="100%"
        userImage={author.image}
        userImageSize="40px"
        username={author.username}
        content={comment}
        subContent={author.username === username ? '삭제' : ''}
        contentFontSize="1.4rem"
        ellipsis={0}
        padding={0}
        alignItems="none"
        cursor="default"
        onImageClick={() => navigate(`/${author.username}`)}
        onSubContentClick={() => setIsConfirm(true)}
      />

      {isConfirm && (
        <Confirm
          onCancel={onCancel}
          onConfirm={onConfirm}
          comment={`${comment} 댓글을 정말 삭제하시겠습니까?`}
        />
      )}
    </Box>
  );
};

export default CommentText;
