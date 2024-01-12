import { useMyInfo } from '@/hooks/useAuth';
import UpdateUserInfo from '../UpdateUserInfo';
import { Box } from '@chakra-ui/react';

const Account = () => {
  const { data: myInfo, isError, isLoading } = useMyInfo();

  if (isLoading) {
    return <Box>로딩중입니다...</Box>;
  }

  if (isError || !myInfo) {
    return <Box>인증되지 않은 사용자 입니다.</Box>;
  }

  const { image, email, fullName, username } = myInfo;
  const { name, timerChannelId } = JSON.parse(fullName);
  return (
    <>
      <UpdateUserInfo
        image={image}
        email={email}
        fullName={name}
        username={username}
        timerChannelId={timerChannelId}
      />
    </>
  );
};

export default Account;
