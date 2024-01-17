import PageHeader from '@/components/PageHeader';
import Message from '@/pages/MessagePage/Message';
import { Flex } from '@chakra-ui/react';

const MessagePage = () => {
  return (
    <Flex flexDir="column" h="100%">
      <PageHeader pageName="DM" flexShrink="0" />
      <Message
        flexGrow="1"
        bgColor="gray300"
        overflowY="auto"
        paddingLeft="20px"
        paddingRight="20px"
      />
    </Flex>
  );
};

export default MessagePage;
