import PageHeader from '@/components/PageHeader';
import Message from '@/components/Message';
import { Flex } from '@chakra-ui/react';
const MessagePage = () => {
  return (
    <Flex flexDir="column">
      <PageHeader pageName="DM" />
      <Message gap="8" minH="100vh" />
    </Flex>
  );
};

export default MessagePage;
