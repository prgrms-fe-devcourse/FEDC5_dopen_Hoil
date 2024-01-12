import OnlineUserProfile from '@/components/OnlineUserProfile';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import { useOnlineUserList } from '@/hooks/useOnlineUserList';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

const OnlineUsers = () => {
  const { onlineUsersListData } = useOnlineUserList();

  return (
    <Box w={DEFAULT_WIDTH} padding={`10px ${DEFAULT_PAGE_PADDING}`}>
      <Text
        fontSize="1.6rem"
        fontWeight="semibold"
        color="black"
        cursor="default"
        mb="10px"
      >
        실시간 접속자
      </Text>
      {onlineUsersListData && !onlineUsersListData.length ? (
        <Text fontSize="1.2rem" fontWeight="medium" cursor="default" mb="10px">
          접속 중인 사용자가 없습니다.
        </Text>
      ) : (
        <Flex gap="8px">
          {onlineUsersListData?.map((onlineUser) => (
            <OnlineUserProfile
              key={onlineUser._id}
              username={onlineUser.username}
              image={onlineUser.image}
            />
          ))}
        </Flex>
      )}
      <Divider mt="13px" color="gray.450" />
    </Box>
  );
};

export default OnlineUsers;
