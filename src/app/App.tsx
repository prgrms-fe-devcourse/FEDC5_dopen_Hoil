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
import ErrorPage from '@/pages/404Page';
import SearchPage from '@/pages/SearchPage';
import BoardEnterPage from '@/pages/BoardEnterPage';
import BoardPage from '@/pages/BoardPage';
import PostEditPage from '@/pages/PostEditPage';
import { useChannelList } from '@/hooks/useChannels';
import NotificationPage from '@/pages/NotificationPage';
import PostViewPage from '@/pages/PostViewPage';
import '@fontsource/noto-sans-kr';
import { Fragment } from 'react';
import UserInfo from '@/pages/UserInfo';
import PrivateRoute from '@/components/common/PrivateRoute';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/pages/PostViewPage/ErrorFallback';
import { useQueryErrorResetBoundary } from 'react-query';
import ReflectionViewPage from '@/pages/ReflectionViewPage';

const App = () => {
  const { channelListData } = useChannelList();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/account" element={<Account />} />
            <Route path="/mypage/mycommentlist" element={<MyCommentList />} />
            <Route path="/mypage/myboardlist" element={<MyBoardList />} />
            <Route path="/message" element={<MessageListPage />} />
            <Route path="/message/:userId" element={<MessagePage />} />
            <Route
              path="/board/:boardName/:postId"
              element={<PostViewPage />}
            />
            <Route
              path="/board/reflection/:postId"
              element={<ReflectionViewPage />}
            />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/timer" element={<TimerPage />} />
          </Route>
          <Route path="/:username" element={<UserInfo />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/board" element={<BoardEnterPage />} />
          {channelListData?.map((board) => (
            <Fragment key={board._id}>
              <Route path={`/board/${board.name}`} element={<BoardPage />} />
              <Route
                path={`/board/${board.name}/post`}
                element={<PostEditPage />}
              />
            </Fragment>
          ))}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
