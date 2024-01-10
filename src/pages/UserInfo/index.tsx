import { useParams } from 'react-router-dom';
import { Avatar, Box, Flex, Button, Text, Heading } from '@chakra-ui/react';

import { useGetUsersList } from '@/hooks/useUser';
import { isValueUniqueInArray } from '@/utils/isValueUniqueInArray';

import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ErrorPage from '@/pages/404Page';

const UserInfo = () => {
  const { username = '' } = useParams();
  const { data: userList = [] } = useGetUsersList();

  // 해당 유저가 존재하는 유저인지 체크
  const isUserExist = isValueUniqueInArray(userList, 'username', username);
  // const { data } = useGetUser();

  if (isUserExist) {
    return <ErrorPage />;
  }

  // - 해당 유저가 존재하지 않는다면, 404 페이지 출력
  // - 해당 유저가 존재한다면 username과 image 출력(추후 git 잔디도 출력)

  // 해당 유저를 내가 팔로우 했는지 체크
  // 내가 해당유저를 팔로우 했는지 체크 했다면 팔로우 취소 버튼, 아직 안했다면 팔로우 버튼 출력

  return (
    <Box border="1px solid" height="100vh">
      <PageHeader pageName={username || ''} />
      <Box padding="25px 20px">
        <Flex alignItems="center">
          <Box mr="15px">
            <Avatar w="118px" h="118px" />
          </Box>
          <Box>
            <Text
              as="strong"
              display="block"
              fontSize="3xl"
              color="pink.300"
              mb="15px"
            >
              {username}
            </Text>
            <Button w="144px" h="40px">
              팔로우
            </Button>
          </Box>
        </Flex>
        <Box mt="55px">
          <Heading></Heading>
          <Box>잔디 자리</Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserInfo;
