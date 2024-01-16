import { Box } from '@chakra-ui/react';
import LoginDday from '@/pages/MainPage/LoginDday';
import GuestDday from '@/pages/MainPage/GuestDday';
import { User } from '@/apis/type';

interface DdayProps {
  myInfo: User | undefined;
}

const Dday = ({ myInfo }: DdayProps) => {
  return (
    <Box
      w="100%"
      margin="25px 0"
      bg="pink.300"
      borderRadius="5px"
      _hover={{ cursor: 'pointer', bg: '#eb7e7e' }}
    >
      {myInfo ? <LoginDday /> : <GuestDday />}
    </Box>
  );
};

export default Dday;
