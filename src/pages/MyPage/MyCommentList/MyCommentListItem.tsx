import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { ListItem, Box, Text } from '@chakra-ui/react';
import { useDeleteComment } from '@/hooks/useComment';
import { MY_COMMENT_LIST } from '@/constants/queryKeys';
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
  const queryClient = useQueryClient();

  const onSuccessFn = () => {
    queryClient.invalidateQueries(MY_COMMENT_LIST);
  };

  const { mutate } = useDeleteComment({ onSuccessFn });

  const onConfirm = () => {
    mutate(id);
  };

  const onCancel = () => {
    setIsConfirm(false);
  };

  const timeAgo = calculateTimeDiff(createdAt) || '';

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
        content={timeAgo}
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
