import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Flex, Box, Img, Text, Icon } from '@chakra-ui/react';
import {
  FaUserCircle,
  FaClipboardList,
  FaPen,
  FaChevronRight,
} from 'react-icons/fa';
import { logOut } from '@/apis/authentication';
import { removeItem } from '@/utils/storage';
import { LOGIN_TOKEN } from '@/constants/user';

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

  const onLogOut = () => {
    logOut();
    removeItem(LOGIN_TOKEN);
    navigator('/');
  };

  return (
    <Box
      maxW={428}
      m="0 auto"
      border="1px solid"
      textAlign="center"
      padding="0 20px"
    >
      <Box>
        <Box mt={15}>
          <Img
            src="https://via.placeholder.com/118x118"
            m="0 auto"
            borderRadius="50%"
            alt="프로필 이미지"
          />
        </Box>
        <ProfileName>공부하는 민수</ProfileName>
      </Box>
      {myPageList.map((mypage, index) => {
        return (
          <MyPageUl key={index}>
            {mypage.map(({ icon, title, href }, index) => {
              return (
                <li key={index} onClick={() => navigator(href)}>
                  <Flex alignItems="center">
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      w="32px"
                      h="32px"
                      borderRadius="4px"
                      marginRight="30px"
                      backgroundColor="#FAFCFE"
                      border="1px"
                      borderColor="gray.200"
                      boxShadow="0px 24px 48px 0 rgba(0,0,0,0.16)"
                    >
                      <Icon as={icon} w="18px" h="18px" fill="pink.300" />
                    </Flex>
                    <Text as="span" fontSize="lg" fontWeight="medium">
                      {title}
                    </Text>
                  </Flex>
                  <Icon as={FaChevronRight} w={8} h={8} />
                </li>
              );
            })}
          </MyPageUl>
        );
      })}
      <MyPageUl onClick={() => {}}>
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
