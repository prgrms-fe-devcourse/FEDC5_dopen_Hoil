import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import MessageList from '@/components/MessageList';
import Message from '@/components/Message/index';
import PageLayout from '@/components/PageLayout/index';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/message" element={<MessageList />} />
          <Route path="/message/:userId" element={<Message />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
