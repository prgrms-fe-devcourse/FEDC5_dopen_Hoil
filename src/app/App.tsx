import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import Account from '@/pages/MyPage/Account';
import MyCommentList from '@/pages/MyPage/MyCommentList';
import MyBoardList from '@/pages/MyPage/MyBoardList';
import MessagePage from '@/pages/MessagePage';
import MessageListPage from '@/pages/MessageListPage';
import PageLayout from '@/components/PageLayout';
import TimerPage from '@/pages/TimerPage';
import '@fontsource/noto-sans-kr';
import ErrorPage from '@/pages/404Page';
import SearchPage from '@/pages/SearchPage';
import BoardEnterPage from '@/pages/BoardEnterPage';
import BoardPage from '@/pages/BoardPage';
import PostEditPage from '@/pages/PostEditPage';
import { useChannelList } from '@/hooks/useChannelList';
import NotificationPage from '@/pages/NotificationPage';
import TimerPage from '@/pages/TimerPage';
import '@fontsource/noto-sans-kr';

const App = () => {
  const { channelListData } = useChannelList();

  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/account" element={<Account />} />
          <Route path="/mypage/mycommentlist" element={<MyCommentList />} />
          <Route path="/mypage/myboardlist" element={<MyBoardList />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/message" element={<MessageListPage />} />
          <Route path="/message/:userId" element={<MessagePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/board" element={<BoardEnterPage />} />
          {channelListData?.map((board) => (
            <>
              <Route
                key={board._id}
                path={`/board/${board.name}`}
                element={<BoardPage />}
              />
              <Route
                key={board._id}
                path={`/board/${board.name}/post`}
                element={<PostEditPage />}
              />
            </>
          ))}
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/timer" element={<TimerPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
