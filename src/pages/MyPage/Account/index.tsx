import { useMyInfo } from '@/hooks/useAuth';
import PageHeader from '@/components/PageHeader';
import UpdateUserInfo from '../UpdateUserInfo';
import Footer from '@/components/Footer';

const Account = () => {
  const { data: myInfo } = useMyInfo();

  if (!myInfo) {
    return;
  }

  const { image, email, fullName, username } = myInfo;
  const { name, timerChannelId } = JSON.parse(fullName);
  return (
    <>
      <PageHeader pageName="회원정보 수정" />
      <UpdateUserInfo
        image={image}
        email={email}
        fullName={name}
        username={username}
        timerChannelId={timerChannelId}
      />
      <Footer />
    </>
  );
};

export default Account;
