import { Link } from 'react-router-dom';
import { Box, UnorderedList, ListItem } from '@chakra-ui/react';
import { preparing } from './preparing';

const LoginFindCredentials = () => {
  return (
    <Box margin="18px 0 23px">
      <UnorderedList display="flex" justifyContent="space-between">
        <ListItem
          listStyleType="none"
          fontSize="sm"
          w="calc(50% - 12px)"
          textAlign="right"
          _hover={{ textDecoration: 'underline' }}
        >
          <Link to="findid" title="아이디 찾기" onClick={preparing}>
            아이디 찾기
          </Link>
        </ListItem>
        <ListItem
          listStyleType="none"
          fontSize="sm"
          w="calc(50% - 12px)"
          textAlign="left"
          _hover={{ textDecoration: 'underline' }}
        >
          <Link to="findpassword" title="비밀번호 찾기" onClick={preparing}>
            비밀번호 찾기
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default LoginFindCredentials;
