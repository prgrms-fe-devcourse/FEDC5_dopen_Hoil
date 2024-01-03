import { Box, Flex, Text } from '@chakra-ui/react';

const LoginDday = () => {
  return (
    <Flex
      padding="10px 20px"
      color="white"
      fontWeight="bold"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize="2xl">데브코스 수료식</Text>
      <Box>
        <Text fontSize="2xl">D-83</Text>
        <Text fontSize="lg" fontWeight="normal">
          2024.03.25
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginDday;
