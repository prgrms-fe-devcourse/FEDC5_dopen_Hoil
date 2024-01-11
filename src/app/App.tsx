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
import ErrorPage from '@/pages/404Page';
import SearchPage from '@/pages/SearchPage';
import BoardEnterPage from '@/pages/BoardEnterPage';
import BoardPage from '@/pages/BoardPage';
import { BOARD_LIST } from '@/constants/Board';
import PostEditPage from '@/pages/PostEditPage';

const App = () => {
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
          <Route path="*" element={<ErrorPage />} />
          <Route path="/board" element={<BoardEnterPage />} />
          {Object.keys(BOARD_LIST).map((board) => (
            <>
              <Route
                key={board}
                path={`/board/${board}`}
                element={<BoardPage />}
              />
              <Route
                key={board}
                path={`/board/${board}/post`}
                element={<PostEditPage />}
              />
            </>
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
