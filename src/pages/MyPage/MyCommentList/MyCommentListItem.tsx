import { ListItem, Box, Text } from '@chakra-ui/react';
import { useDeleteComment } from '@/hooks/useMyComment';

import UserContentBlock from '@/components/common/UserContentBlock';
import Confirm from '@/components/common/Confirm';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
interface MyCommentListItemProps {
  id: string;
  image: string;
  username: string;
  comment: string;
  lineClamp: number;
}

const MyCommentListItem = ({
  id,
  image,
  username,
  comment,
  lineClamp = 1,
}: MyCommentListItemProps) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useDeleteComment({ queryClient });

  const onConfirm = () => {
    mutate(id);
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
        content="2일전"
        subContent="취소"
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
