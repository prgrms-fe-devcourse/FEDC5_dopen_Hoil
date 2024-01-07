import { Flex } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import Message from '@/pages/MessagePage/Message';

const MessagePage = () => {
  return (
    <Flex flexDir="column">
      <PageHeader pageName="DM" />
      <Message gap="10" minH="100vh" bgColor="gray.300" />
    </Flex>
  );
};

export default MessagePage;
