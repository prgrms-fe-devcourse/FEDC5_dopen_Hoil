import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SignUp from '@/components/member/SignUp';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
