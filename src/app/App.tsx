import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SignUp from '@/pages/SignUp';
import MyPage from '@/pages/MyPage';
import MessagePage from '@/pages/MessagePage';
import MessageListPage from '@/pages/MessageListPage';
import PageLayout from '@/components/PageLayout';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/message" element={<MessageListPage />} />
          <Route path="/message/:userId" element={<MessagePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
