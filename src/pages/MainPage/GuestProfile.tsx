import { Avatar, Flex, Text } from '@chakra-ui/react';

const GuestProfile = () => {
  return (
    <Flex alignItems="center" width="100%">
      <Avatar size="2xl" />
      <Flex direction="column" marginLeft="20px">
        <Text
          width="fit-content"
          fontSize="3xl"
          fontWeight="bold"
          color="pink.300"
          borderBottom="2px"
          borderColor="transparent"
          transition="border-bottom 0.5s"
          _hover={{ cursor: 'pointer', borderColor: 'pink.300' }}
        >
          {/* TODO : 로그인 버튼 클릭 시 로그인 페이지로 넘어가도록 처리 필요. */}
          로그인
        </Text>
        <Text fontStyle="oblique" fontSize="md" cursor="default">
          도펜에 가입한 사람이 가장 많은 시간을 갖는다.
        </Text>
      </Flex>
    </Flex>
  );
};

export default GuestProfile;
