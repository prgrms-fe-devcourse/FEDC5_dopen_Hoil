import React, { Fragment, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import '@fontsource/noto-sans-kr';

import PageLayout from '@/components/PageLayout';
import ErrorPage from '@/pages/404Page';

import { useChannelList } from '@/hooks/useChannels';

import PrivateRoute from '@/components/common/PrivateRoute';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/pages/PostViewPage/ErrorFallback';
import { useQueryErrorResetBoundary } from 'react-query';

import { Spinner } from '@chakra-ui/react';

const MainPage = React.lazy(() => import('@/pages/MainPage'));
const Login = React.lazy(() => import('@/pages/Login'));
const SignUp = React.lazy(() => import('@/pages/SignUp'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const Account = React.lazy(() => import('@/pages/MyPage/Account'));
const MyCommentList = React.lazy(() => import('@/pages/MyPage/MyCommentList'));
const MyBoardList = React.lazy(() => import('@/pages/MyPage/MyBoardList'));
const MessageListPage = React.lazy(() => import('@/pages/MessageListPage'));
const MessagePage = React.lazy(() => import('@/pages/MessagePage'));
const ReflectionViewPage = React.lazy(
  () => import('@/pages/ReflectionViewPage'),
);
const PostViewPage = React.lazy(() => import('@/pages/PostViewPage'));
const NotificationPage = React.lazy(() => import('@/pages/NotificationPage'));
const TimerPage = React.lazy(() => import('@/pages/TimerPage'));
const UserInfo = React.lazy(() => import('@/pages/UserInfo'));
const SearchPage = React.lazy(() => import('@/pages/SearchPage'));
const BoardEnterPage = React.lazy(() => import('@/pages/BoardEnterPage'));
const ReflectionPostEditPage = React.lazy(
  () => import('@/pages/ReflectionPostEditPage'),
);
const BoardPage = React.lazy(() => import('@/pages/BoardPage'));
const PostEditPage = React.lazy(() => import('@/pages/PostEditPage'));

const App = () => {
  const { channelListData } = useChannelList();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <PageLayout>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<Spinner />}>
          <Routes>
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
                path="/board/reflection/:postId"
                element={<ReflectionViewPage />}
              />
              <Route
                path="/board/:boardName/:postId"
                element={<PostViewPage />}
              />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/timer" element={<TimerPage />} />
            </Route>
            <Route path="/:username/*" element={<UserInfo />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/board" element={<BoardEnterPage />} />
            <Route
              path="/board/reflection/post"
              element={<ReflectionPostEditPage />}
            />
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
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default App;
