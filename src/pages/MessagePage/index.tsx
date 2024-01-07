import { Flex } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import Message from '@/pages/MessagePage/Message';

const MessagePage = () => {
  return (
    <Flex flexDir="column" h="100vh">
      <PageHeader pageName="DM" />
      <Message bgColor="gray.300" minH="100vh" overflowY="auto" />
    </Flex>
  );
};

export default MessagePage;
