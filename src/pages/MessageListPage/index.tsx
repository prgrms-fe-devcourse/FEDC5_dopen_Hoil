import PageHeader from '@/components/PageHeader';
import MessageList from '@/components/MessageList';

const MessageListPage = () => {
  return (
    <>
      <PageHeader pageName="메세지" />
      <MessageList gap="10" h="100vh" />
    </>
  );
};

export default MessageListPage;
