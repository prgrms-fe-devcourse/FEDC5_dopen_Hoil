import OnlineUserProfile from '@/components/OnlineUserProfile';
import { DEFAULT_PAGE_PADDING, DEFAULT_WIDTH } from '@/constants/style';
import { useOnlineUserList } from '@/hooks/useOnlineUserList';
import { Box, Divider, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

const OnlineUsers = () => {
  const { onlineUsersListData = [] } = useOnlineUserList();

  return (
    <Box w={DEFAULT_WIDTH} padding={`10px ${DEFAULT_PAGE_PADDING}`}>
      <Text fontSize="1.6rem" fontWeight="semibold" cursor="default" mb="10px">
        실시간 접속자
      </Text>
      {!onlineUsersListData.length ? (
        <Text fontSize="1.2rem" fontWeight="medium" cursor="default" mb="10px">
          접속 중인 사용자가 없습니다.
        </Text>
      ) : (
        <OnlineUsersBox>
          {onlineUsersListData.map((onlineUser) => (
            <OnlineUserProfile
              key={onlineUser._id}
              username={onlineUser.username}
              image={onlineUser.image}
            />
          ))}
        </OnlineUsersBox>
      )}
      <Divider mt="13px" color="gray.450" />
    </Box>
  );
};

const OnlineUsersBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default OnlineUsers;
