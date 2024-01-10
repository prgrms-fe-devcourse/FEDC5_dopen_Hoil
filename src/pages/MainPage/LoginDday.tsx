import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import DdayModal from './DdayModal';

const LoginDday = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      padding="10px 20px"
      color="white"
      fontWeight="bold"
      alignItems="center"
      justifyContent="space-between"
      onClick={onOpen}
    >
      <Text fontSize="2xl">데브코스 수료식</Text>
      <Box>
        <Text fontSize="2xl">D-83</Text>
        <Text fontSize="lg" fontWeight="normal">
          2024.03.25
        </Text>
      </Box>
      <DdayModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default LoginDday;
