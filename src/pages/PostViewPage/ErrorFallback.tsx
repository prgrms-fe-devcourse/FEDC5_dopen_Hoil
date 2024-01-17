import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Box, Button } from '@chakra-ui/react';
import { AuthError } from '@/apis/authentication';

interface ErrorFallbackProps {
  error: AxiosError;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const navigate = useNavigate();
  if (error?.response?.status === 401) {
    return (
      <Box
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        textAlign="center"
        p="200px 0"
      >
        <Box width="100%" fontSize="2rem" mb="20px">
          권한이 없습니다
        </Box>
        <Button ml="20px" onClick={() => navigate('/login')}>
          로그인 화면으로 이동하기
        </Button>
      </Box>
    );
  }

  if (!error?.response && !(error instanceof AuthError)) {
    return (
      <Box
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        textAlign="center"
        p="200px 0"
      >
        <Box width="100%" fontSize="2rem" mb="20px">
          에러가 발생했습니다
        </Box>
        <Button onClick={() => resetErrorBoundary()}>다시 시도하기</Button>
        <Button ml="20px" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </Box>
    );
  }
};

export default ErrorFallback;
