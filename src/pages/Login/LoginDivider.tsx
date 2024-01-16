import { Flex, Divider, Text } from '@chakra-ui/react';

const LoginDivider = () => {
  return (
    <Flex alignItems="center" margin="48px 0 32px">
      <Divider
        orientation="horizontal"
        borderColor="#666666"
        w="calc(50% - 25px)"
      />
      <Text as="p" w="50px" fontSize="sm">
        또는
      </Text>
      <Divider
        orientation="horizontal"
        borderColor="#666666"
        w="calc(50% - 25px)"
      />
    </Flex>
  );
};

export default LoginDivider;
