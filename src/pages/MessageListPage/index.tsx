import PageHeader from '@/components/PageHeader';
import MessageList from '@/components/MessageList';
import { Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';

const MessageListPage = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <PageHeader pageName="메세지" />
        <MessageList gap="10" h="100vh" />
      </Suspense>
    </>
  );
};

export default MessageListPage;
