import { useState } from 'react';
import { ListItem, Box, Text } from '@chakra-ui/react';
import { useDeleteComment } from '@/hooks/useComment';
import UserContentBlock from '@/components/common/UserContentBlock';
import Confirm from '@/components/common/Confirm';
import { calculateTimeDiff } from '@/utils/calculateTimeDiff';
interface MyCommentListItemProps {
  id: string;
  image: string;
  username: string;
  comment: string;
  createdAt: string;
  lineClamp: number;
}

const MyCommentListItem = ({
  id,
  image,
  username,
  comment,
  createdAt,
  lineClamp = 1,
}: MyCommentListItemProps) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const deleteCommentMutate = useDeleteComment();

  const onConfirm = () => {
    deleteCommentMutate(id);
    setIsConfirm(false);
  };

  const onCancel = () => {
    setIsConfirm(false);
  };

  return (
    <ListItem key={id} p="10px 0 10px" borderBottom="1px solid #D9D9D9">
      <UserContentBlock
        p="0"
        w="100%"
        cursor="default"
        userImage={image}
        userImageSize="40px"
        username={username}
        isOnline={false}
        content={calculateTimeDiff(createdAt) || ''}
        subContent="삭제"
        onSubContentClick={() => setIsConfirm(true)}
      />
      <Box mt="10px">
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
