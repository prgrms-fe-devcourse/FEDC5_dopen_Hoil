import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Flex, Box, Text, Button, Avatar } from '@chakra-ui/react';
import { useMyInfo } from '@/hooks/useAuth';
import { useCreateFollow, useDeleteFollow } from '@/hooks/useFollow';
import { User } from '@/apis/type';
import { MY_INFO } from '@/constants/queryKeys';

interface UserProfileProps {
  userList: User[];
  username: string;
}

const UserProfile = ({ userList, username }: UserProfileProps) => {
  const { image, _id: id } = userList.filter(
    (user) => user.username === username,
  )[0];

  const [isFollowing, setIsFollowing] = useState(false);
  const [followId, setFollowId] = useState(id);

  const { data: myInfo, isSuccess } = useMyInfo();

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
    </Flex>
  );
};

export default UserProfile;
