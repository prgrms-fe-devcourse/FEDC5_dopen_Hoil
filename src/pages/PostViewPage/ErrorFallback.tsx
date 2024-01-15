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
      <Box>
        <Box>권한이 없습니다</Box>
        <Button onClick={() => navigate('/login')}>
          로그인 화면으로 이동하기
        </Button>
      </Box>
    );
  }

  if (!error?.response && !(error instanceof AuthError)) {
    return (
      <Box>
        <Box>에러가 발생했습니다</Box>
        <Button onClick={() => resetErrorBoundary()}>다시 시도하기</Button>
        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      </Box>
    );
  }
};

export default ErrorFallback;
