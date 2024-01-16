import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box, Text, Avatar } from '@chakra-ui/react';
import { LOGIN_TOKEN } from '@/constants/user';
import { removeItem } from '@/utils/storage';
import { useLogOut, useMyInfo } from '@/hooks/useAuth';
import MyPageListItem from './MyPageListItem';
import { MYPAGE_LIST } from './myPageList';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';

const MyPage = () => {
  const navigator = useNavigate();

  const onSuccessFn = () => {
    removeItem(LOGIN_TOKEN);
    navigator('/', { replace: true });
  };
  const { mutate } = useLogOut({ onSuccessFn });
  const { data: myInfo } = useMyInfo();

  const onLogOut = () => {
    mutate();
  };

  return (
    <Box w="100%" h="100vh" m="0 auto" textAlign="center">
      <PageHeader pageName="마이페이지" />
      <Box padding="20px" h="calc(100% - 160px)">
        <Box
          width="fit-content"
          margin="15px auto 0"
          cursor="pointer"
          onClick={() => navigator(`/${myInfo?.username}`)}
        >
          <Box>
            <Avatar
              w="118px"
              h="118px"
              name={myInfo?.username + '님의 프로필 이미지입니다.'}
              src={myInfo?.image || 'https://via.placeholder.com/118x118'}
            />
          </Box>
          <ProfileName>{myInfo?.username}</ProfileName>
        </Box>
        {MYPAGE_LIST.map((mypage, index) => {
          return (
            <MyPageUl key={index}>
              {mypage.map(({ icon, title, href }, index) => {
                return (
                  <MyPageListItem
                    key={index}
                    icon={icon}
                    title={title}
                    href={href}
                    username={myInfo?.username}
                  />
                );
              })}
            </MyPageUl>
          );
        })}
        <MyPageUl>
          <li onClick={onLogOut}>
            <Text as="strong" fontSize="lg" color="pink.400">
              로그아웃
            </Text>
          </li>
        </MyPageUl>
      </Box>
      <Footer />
    </Box>
  );
};

const ProfileName = styled.strong`
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 10px;
`;

const MyPageUl = styled.ul`
  background-color: #fff;
  border-radius: 5px;
  box-shadow: rgba(17, 12, 46, 0.05) 0px 1px 100px 0px;
  margin-top: 20px;
  & > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 65px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default MyPage;
