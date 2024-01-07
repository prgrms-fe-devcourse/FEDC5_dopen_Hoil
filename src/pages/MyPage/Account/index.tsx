import useUserInfo from '@/hooks/useUserInfo';
import UpdateUserInfo from '../UpdateUserInfo';

const Account = () => {
  const { image, email, fullName, username } = useUserInfo();

  return (
    <>
      {email && fullName ? (
        <UpdateUserInfo
          image={image}
          email={email}
          fullName={fullName}
          username={username}
        />
      ) : (
        '인증되지 않은 사용자입니다.'
      )}
    </>
  );
};

export default Account;
