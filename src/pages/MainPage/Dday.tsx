import { Box, Flex, Text } from '@chakra-ui/react';

interface DdayProps {
  isLoggedIn?: boolean;
}

const Dday = ({ isLoggedIn = false }: DdayProps) => {
  return (
    <Box
      width="100%"
      marginTop="25px"
      bg="pink.300"
      borderRadius="5px"
      _hover={{ cursor: 'pointer', bg: '#eb7e7e' }}
    >
      {/* TODO
      - D-Day 설정 모달 추가
      - 비로그인일 때 클릭 시 로그인 페이지, 로그인일 때 클릭 시 D-Day 설정 모달 띄우기*/}
      {isLoggedIn ? (
        <Flex
          padding="10px 20px"
          color="white"
          fontWeight="bold"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize="2xl">데브코스 수료식</Text>
          <Box>
            <Text fontSize="2xl">D-83</Text>
            <Text fontSize="lg" fontWeight="normal">
              2024.03.25
            </Text>
          </Box>
        </Flex>
      ) : (
        <Flex
          padding="10px 20px"
          color="white"
          fontWeight="bold"
          direction="column"
        >
          <Text fontSize="2xl">D-Day를 등록해보세요.</Text>
          <Text fontSize="md">D-Day는 로그인 후 등록 가능합니다.</Text>
        </Flex>
      )}
    </Box>
  );
};

export default Dday;
