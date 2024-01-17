import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box, Text, Avatar, useColorModeValue, Flex } from '@chakra-ui/react';
import { LOGIN_TOKEN } from '@/constants/user';
import { removeItem } from '@/utils/storage';
import { useLogOut, useMyInfo } from '@/hooks/useAuth';
import MyPageListItem from './MyPageListItem';
import { MYPAGE_LIST } from './myPageList';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';

const MyPage = () => {
  const navigator = useNavigate();

  const menuListBg = useColorModeValue('#fff', '#1c1c1c');

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
    <Flex w="100%" flex="1" flexDir="column" m="0 auto">
      <PageHeader pageName="마이페이지" />
      <Box padding="20px" flex="1">
        <Box
          width="fit-content"
          margin="15px auto 0"
          cursor="pointer"
          textAlign="center"
          onClick={() => navigator(`/${myInfo?.username}`)}
        >
          <Box>
            <Avatar w="118px" h="118px" src={myInfo?.image || ''} />
          </Box>
          <ProfileName>{myInfo?.username}</ProfileName>
        </Box>
        {MYPAGE_LIST.map((mypage, index) => {
          return (
            <MyPageUl key={index} menuListBg={menuListBg}>
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
        <MyPageUl menuListBg={menuListBg}>
          <li onClick={onLogOut}>
            <Text as="strong" fontSize="lg" color="pink.400">
              로그아웃
            </Text>
          </li>
        </MyPageUl>
      </Box>
      <Footer />
    </Flex>
  );
};

const ProfileName = styled.strong`
  display: inline-block;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 10px;
`;

const MyPageUl = styled.ul<{ menuListBg?: '#fff' | '#1c1c1c' }>`
  background-color: ${({ menuListBg }) => menuListBg};
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
