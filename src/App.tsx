import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SignUp from '@/pages/SignUp';
import MyPage from '@/pages/MyPage';
import UpdateUserInfo from './pages/MyPage/UpdateUserInfo';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/account" element={<UpdateUserInfo />} />
      </Routes>
    </>
  );
};

export default App;
