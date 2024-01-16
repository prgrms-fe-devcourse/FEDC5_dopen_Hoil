import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Box, Button } from '@chakra-ui/react';
import { useCreateFollow, useDeleteFollow } from '@/hooks/useFollow';

import { getItem } from '@/utils/storage';

import { LOGIN_TOKEN } from '@/constants/user';
import Confirm from '@/components/common/Confirm';

interface UserProfileButtonProps {
  isFollowing: boolean;
  followId: string;
  userId: string;
  onupdateFollowing: (isFollowing: boolean) => void;
}

const UserProfileButton = ({
  isFollowing,
  followId,
  userId,
  onupdateFollowing,
}: UserProfileButtonProps) => {
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);

  const queryClient = useQueryClient();
  const onSuccessFn = () => {
    queryClient.invalidateQueries();
  };

  const { mutate: createFollow } = useCreateFollow({
    id: userId,
    onSuccessFn,
  });
  const { mutate: deleteFollow } = useDeleteFollow({
    id: followId,
    onSuccessFn,
  });

  const onCreateFollow = () => {
    if (isFollowing) {
      alert('이미 팔로우 하신 상태 입니다.');
      return;
    }
    if (!getItem(LOGIN_TOKEN, '')) {
      setIsConfirm(true);
      return;
    }
    createFollow();
    onupdateFollowing(true);
  };

  const onDeleteFollow = () => {
    if (isFollowing === false) {
      alert('다시 시도해주세요.');
      return;
    }
    deleteFollow();
    onupdateFollowing(false);
  };

  const onConfirm = () => {
    setIsConfirm(false);
    navigate('/login');
  };

  const onCancel = () => {
    setIsConfirm(false);
  };

  const onSendMessage = () => {
    navigate(`/message/${userId}`);
  };

  return (
    <Box>
      {isFollowing ? (
        <Button
          w="120px"
          h="40px"
          fontSize="1.4rem"
          fontWeight="medium"
          onClick={onDeleteFollow}
          backgroundColor="pink.300"
          color="white"
          _hover={{
            backgroundColor: 'pink.400',
          }}
        >
          팔로우 취소
        </Button>
      ) : (
        <Button
          w="120px"
          h="40px"
          fontSize="1.4rem"
          fontWeight="medium"
          backgroundColor="pink.300"
          color="white"
          onClick={onCreateFollow}
          _hover={{
            backgroundColor: 'pink.400',
          }}
        >
          팔로우
        </Button>
      )}
      <Button
        w="120px"
        h="40px"
        fontSize="1.4rem"
        fontWeight="medium"
        backgroundColor="gray.300"
        ml="10px"
        onClick={onSendMessage}
      >
        메시지 보내기
      </Button>
      {isConfirm && (
        <Confirm
          onCancel={onCancel}
          onConfirm={onConfirm}
          comment={
            '님을 팔로우 하기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까'
          }
        />
      )}
    </Box>
  );
};

export default UserProfileButton;
