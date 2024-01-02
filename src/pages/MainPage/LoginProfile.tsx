import { Avatar, Flex, Text } from '@chakra-ui/react';

const LoginProfile = () => {
  return (
    <Flex alignItems="center" width="100%">
      <Avatar
        size="2xl"
        name="Kola Tioluwani"
        src="https://bit.ly/tioluwani-kolawole"
        cursor="default"
      />
      <Flex direction="column" marginLeft="20px">
        <Text
          width="fit-content"
          fontSize="3xl"
          fontWeight="bold"
          _hover={{ cursor: 'pointer' }}
        >
          {/* TODO: 클릭 시 마이페이지로 가게 처리 필요 */}
          <span style={{ color: '#F88585' }}>[사용자 이름]</span>님 안녕하세요!
        </Text>
        <Text fontStyle="oblique" fontSize="md" cursor="default">
          [사용자가 설정한 명언]
        </Text>
      </Flex>
    </Flex>
  );
};

export default LoginProfile;
