import MainHeader from '@/components/MainHeader';
import NotLoginProfil from '@/pages/MainPage/NotLoginProfile';
import { defaultWidth } from '@/constants/style';
import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import LoginedProfil from './LoginProfile';

const MainPage = () => {
  const [isLogin, setIsLoigin] = useState(false); // 로그인 유무를 구분하기 위한 임시 값입니다.
  return (
    <>
      <Flex
        position="relative"
        w={defaultWidth}
        height="100vh"
        margin="0 auto"
        direction="column"
      >
        <MainHeader />
        <Flex w={defaultWidth} p="20px 10px 90px 10px" overflowY="auto">
          {isLogin ? <LoginedProfil /> : <NotLoginProfil />}
        </Flex>
        {/* 하단 네비게이터 위치 */}
        <Box
          w={defaultWidth}
          position="absolute"
          bottom="0"
          height="80px"
          bg="gray.300"
        />
        {/* 하단 네비게이터 위치 */}
      </Flex>
    </>
  );
};

export default MainPage;
