import { DEFAULT_WIDTH } from '@/constants/style';
import { Box } from '@chakra-ui/react';
import LoginDday from '@/pages/MainPage/LoginDday';
import GuestDday from '@/pages/MainPage/GuestDday';

interface DdayProps {
  isLoggedIn?: boolean;
}

const Dday = ({ isLoggedIn = false }: DdayProps) => {
  return (
    <Box
      maxW={DEFAULT_WIDTH}
      marginTop="25px"
      bg="pink.300"
      borderRadius="5px"
      _hover={{ cursor: 'pointer', bg: '#eb7e7e' }}
    >
      {/* TODO
      - D-Day 설정 모달 추가
      - 비로그인일 때 클릭 시 로그인 페이지, 로그인일 때 클릭 시 D-Day 설정 모달 띄우기*/}
      {isLoggedIn ? <LoginDday /> : <GuestDday />}
    </Box>
  );
};

export default Dday;
