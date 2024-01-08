import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import MessagePage from '@/pages/MessagePage';
import MessageListPage from '@/pages/MessageListPage';
import PageLayout from '@/components/PageLayout';
import SearchPage from '../pages/SearchPage';
import TimerPage from '@/pages/TimerPage';
import '@fontsource/noto-sans-kr';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/message" element={<MessageListPage />} />
          <Route path="/message/:userId" element={<MessagePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/timer" element={<TimerPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
