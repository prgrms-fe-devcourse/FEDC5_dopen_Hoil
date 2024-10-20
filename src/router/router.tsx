import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from '@/components/common/PrivateRoute';
import ErrorPage from '@/pages/404Page';
import { useChannelList } from '@/hooks/useChannels';

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

const AppRouter = () => {
  const { channelListData } = useChannelList();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      element: <PrivateRoute />,
      children: [
        { path: '/mypage', element: <MyPage /> },
        { path: '/mypage/account', element: <Account /> },
        { path: '/mypage/mycommentlist', element: <MyCommentList /> },
        { path: '/mypage/myboardlist', element: <MyBoardList /> },
        { path: '/message', element: <MessageListPage /> },
        { path: '/message/:userId', element: <MessagePage /> },
        { path: '/board/reflection/:postId', element: <ReflectionViewPage /> },
        { path: '/board/:boardName/:postId', element: <PostViewPage /> },
        { path: '/notification', element: <NotificationPage /> },
        { path: '/timer', element: <TimerPage /> },
      ],
    },
    {
      path: '/:username/*',
      element: <UserInfo />,
    },
    {
      path: '/search',
      element: <SearchPage />,
    },
    {
      path: '/board',
      element: <BoardEnterPage />,
    },
    {
      path: '/board/reflection/post',
      element: <ReflectionPostEditPage />,
    },
    {
      path: '/board',
      children: channelListData?.flatMap((board) => [
        {
          path: board.name,
          element: <BoardPage />,
        },
        {
          path: `${board.name}/post`,
          element: <PostEditPage />,
        },
      ]),
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
