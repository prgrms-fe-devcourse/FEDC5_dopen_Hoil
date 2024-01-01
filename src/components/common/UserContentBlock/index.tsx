import { Avatar, Flex, Text, VStack } from '@chakra-ui/react';

const UserContentBlock = () => {
  return (
    <Flex>
      <Avatar name="Kent Dodds"></Avatar>
      <VStack>
        <Text>닉네임</Text>
        <Text>내용</Text>
      </VStack>
    </Flex>
  );
};

export default UserContentBlock;
