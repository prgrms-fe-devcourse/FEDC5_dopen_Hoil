import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem, Box, Text } from '@chakra-ui/react';
import { useDeleteComment } from '@/hooks/useComment';
import { usePostDetail } from '@/hooks/usePost';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
import UserContentBlock from '@/components/common/UserContentBlock';
import Confirm from '@/components/common/Confirm';

interface MyCommentListItemProps {
  id: string;
  image: string;
  postId: string;
  username: string;
  comment: string;
  createdAt: string;
  lineClamp: number;
}

const MyCommentListItem = ({
  id,
  image,
  postId,
  username,
  comment,
  createdAt,
  lineClamp = 1,
}: MyCommentListItemProps) => {
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

  const { data: myPost } = usePostDetail({ id: postId });

  const onMoveMyComment = (id: string, channel: string) => {
    switch (channel) {
      case 'free':
        navigate(`/board/free/${id}`);
        break;
      case 'reflection':
        navigate(`/board/reflection/${id}`);
        break;
      case 'infoshare':
        navigate(`/board/infoshare/${id}`);
        break;
    }
  };

  return (
    <ListItem key={id} p="10px 0 10px" borderBottom="1px solid #D9D9D9">
      <UserContentBlock
        p="0"
        w="100%"
        userImage={image}
        userImageSize="40px"
        username={username}
        isOnline={false}
        content={calculateTimeDiff(createdAt) || ''}
        subContent="삭제"
        onContentClick={() => onMoveMyComment(postId, myPost.channel?.name)}
        onSubContentClick={() => setIsConfirm(true)}
      />
      <Box
        pt="10px"
        cursor="pointer"
        onClick={() => onMoveMyComment(postId, myPost.channel?.name)}
      >
        <Text noOfLines={lineClamp} fontSize="1.3rem">
          {comment}
        </Text>
      </Box>

      {isConfirm && (
        <Confirm
          onCancel={onCancel}
          onConfirm={onConfirm}
          comment={`${comment} 댓글을 정말 삭제하시겠습니까?`}
        />
      )}
    </ListItem>
  );
};

export default MyCommentListItem;
