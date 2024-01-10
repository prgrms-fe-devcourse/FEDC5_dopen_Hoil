import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import Account from '@/pages/MyPage/Account';
import MessagePage from '@/pages/MessagePage';
import MessageListPage from '@/pages/MessageListPage';
import PageLayout from '@/components/PageLayout';
import ErrorPage from '@/pages/404Page';
import SearchPage from '@/pages/SearchPage';
import BoardEnterPage from '@/pages/BoardEnterPage';
import BoardPage from '@/pages/BoardPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/account" element={<Account />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/message" element={<MessageListPage />} />
          <Route path="/message/:userId" element={<MessagePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/board" element={<BoardEnterPage />} />
          <Route path="/board/free" element={<BoardPage />} />
          <Route path="/board/infoshare" element={<BoardPage />} />
          <Route path="/board/reflections" element={<BoardPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
