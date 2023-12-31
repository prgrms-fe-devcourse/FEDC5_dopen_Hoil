import MainHeader from '@/components/MainHeader';
import NotLoginProfil from '@/pages/MainPage/NotLoginProfil';
import { WIDTH } from '@/constants/style';
import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import LoginedProfil from './LoginedProfil';

const MainPage = () => {
  const [isLogin, setIsLoigin] = useState(false); // 로그인 유무를 구분하기 위한 임시 값입니다.
  return (
    <>
      <Flex
        position="relative"
        w={WIDTH}
        height="100vh"
        margin="0 auto"
        direction="column"
      >
        <MainHeader />
        <Flex w={WIDTH} p="20px 10px 90px 10px" overflowY="auto">
          {isLogin ? (
            <>
              <LoginedProfil />
            </>
          ) : (
            <>
              <NotLoginProfil />
            </>
          )}
        </Flex>
        {/* 하단 네비게이터 위치 입니다. */}
        <Box
          w={WIDTH}
          position="absolute"
          bottom="0"
          height="80px"
          bg="gray.300"
        />
      </Flex>
    </>
  );
};

export default MainPage;
