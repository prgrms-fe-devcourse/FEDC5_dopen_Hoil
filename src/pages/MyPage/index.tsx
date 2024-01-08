import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Box, Text, Avatar } from '@chakra-ui/react';
import { FaUserCircle, FaClipboardList, FaPen } from 'react-icons/fa';
import { LOGIN_TOKEN } from '@/constants/user';
import { removeItem } from '@/utils/storage';
import { useLogOut, useMyInfo } from '@/hooks/useAuth';
import MyPageListItem from './MyPageListItem';

const myPageList = [
  [
    {
      icon: FaUserCircle,
      title: '회원정보 수정',
      href: '/mypage/account',
    },
  ],
  [
    {
      icon: FaClipboardList,
      title: '내가 작성한 게시글 보기',
      href: '/mypage/myboardlist',
    },
    {
      icon: FaPen,
      title: '내가 작성한 댓글 보기',
      href: '/mypage/mycommentlist',
    },
  ],
];

const MyPage = () => {
  const navigator = useNavigate();

  const onSuccessFn = () => {
    removeItem(LOGIN_TOKEN);
    navigator('/', { replace: true });
  };
  const { mutate } = useLogOut({ onSuccessFn });

  const onLogOut = () => {
    mutate;
  };

  const { data: myInfo, isLoading } = useMyInfo();

  if (isLoading || !myInfo) {
    return <Box>로딩중입니다...</Box>;
  }

  return (
    <Box w="100%" h="100vh" m="0 auto" textAlign="center" padding="0 20px">
      <Box>
        <Box mt={15}>
          <Avatar
            w="118px"
            h="118px"
            name={myInfo.username + '님의 프로필 이미지입니다.'}
            src={myInfo.image || 'https://via.placeholder.com/118x118'}
          />
        </Box>
        <ProfileName>{myInfo.username}</ProfileName>
      </Box>
      {myPageList.map((mypage, index) => {
        return (
          <MyPageUl key={index}>
            {mypage.map(({ icon, title, href }, index) => {
              return (
                <MyPageListItem
                  key={index}
                  icon={icon}
                  title={title}
                  href={href}
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
  );
};

const ProfileName = styled.strong`
  display: inline-block;
  font-size: 20px;
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
