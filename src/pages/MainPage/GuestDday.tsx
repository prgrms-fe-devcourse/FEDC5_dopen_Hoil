import { Flex, Text } from '@chakra-ui/react';

const GuestDday = () => {
  return (
    <Flex
      padding="10px 20px"
      color="white"
      fontWeight="bold"
      direction="column"
    >
      <Text fontSize="2xl">D-Day를 등록해보세요.</Text>
      <Text fontSize="md">D-Day는 로그인 후 등록 가능합니다.</Text>
    </Flex>
  );
};

export default GuestDday;
