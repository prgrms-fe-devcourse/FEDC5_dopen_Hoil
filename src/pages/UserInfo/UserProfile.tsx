import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, Text, Button, Avatar } from '@chakra-ui/react';
import { useMyInfo } from '@/hooks/useAuth';
import { useCreateFollow, useDeleteFollow } from '@/hooks/useFollow';
import { User } from '@/apis/type';
import { MY_INFO } from '@/constants/queryKeys';
import { LOGIN_TOKEN } from '@/constants/user';
import { getItem } from '@/utils/storage';
import Confirm from '@/components/common/Confirm';

interface UserProfileProps {
  userList: User[];
  username: string;
}

const UserProfile = ({ userList, username }: UserProfileProps) => {
  const navigate = useNavigate();
  const { image, _id: id } = userList.filter(
    (user) => user.username === username,
  )[0];
  const [isConfirm, setIsConfirm] = useState(false);
  const [isFollowing, setIsFollowing] = useState<null | boolean>(null);
  const [followId, setFollowId] = useState(id);

  const { data: myInfo, isSuccess } = useMyInfo();
  useEffect(() => {
    if (!myInfo) {
      return;
    }

    const { following } = myInfo;
    if (isSuccess) {
      const isAlreadyFollowing = following.some(({ user, _id }) => {
        if (user === id) {
          setFollowId(_id);
          return user === id;
        }
      });
      setIsFollowing(isAlreadyFollowing);
    }
  }, [myInfo]);

  const queryClient = useQueryClient();

  const onSuccessFn = () => {
    queryClient.invalidateQueries(MY_INFO);
  };

  const { mutate: createFollow } = useCreateFollow({
    id,
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
    setIsFollowing(true);
  };

  const onDeleteFollow = () => {
    if (isFollowing === false) {
      alert('다시 시도해주세요.');
      return;
    }
    deleteFollow();
    setIsFollowing(false);
  };

  const onConfirm = () => {
    setIsConfirm(false);
    navigate('/login');
  };

  const onCancel = () => {
    setIsConfirm(false);
  };

  return (
    <Flex alignItems="center">
      <Box mr="15px">
        <Avatar src={image} w="118px" h="118px" />
      </Box>
      <Box>
        <Text
          as="strong"
          display="block"
          fontSize="3xl"
          color="pink.300"
          mb="15px"
        >
          {username}
        </Text>
        {isFollowing ? (
          <Button
            w="144px"
            h="40px"
            onClick={onDeleteFollow}
            backgroundColor="pink.300"
            color="white"
            _hover={{
              color: '#222',
              backgroundColor: 'gray.300',
            }}
          >
            팔로우 취소
          </Button>
        ) : (
          <Button
            w="144px"
            h="40px"
            backgroundColor="gray.300"
            onClick={onCreateFollow}
            _hover={{
              backgroundColor: 'pink.300',
              color: '#fff',
            }}
          >
            팔로우
          </Button>
        )}
      </Box>
      {isConfirm && (
        <Confirm
          onCancel={onCancel}
          onConfirm={onConfirm}
          comment={`${username}님을 팔로우 하기 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까`}
        />
      )}
    </Flex>
  );
};

export default UserProfile;
