import { useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import OnlineUsers from '@/pages/BoardPage/OnlineUsers';
import WriteButton from '@/pages/BoardPage/WriteButton';
import BoardPostList from '@/pages/BoardPage/BoardPostList';
import { useChannelList } from '@/hooks/useChannels';

const BoardPage = () => {
  const { channelListData = [] } = useChannelList();
  const { pathname } = useLocation();
  const pathInfo = channelListData?.filter(
    (channel) => channel.name === pathname.split('/')[2],
  )[0];

  return (
    <>
      <PageHeader pageName={pathInfo.description} />
      <OnlineUsers />
      <BoardPostList channelId={pathInfo._id} />
      <WriteButton />
      <Footer position="sticky" bottom="0" />
    </>
  );
};
export default BoardPage;
