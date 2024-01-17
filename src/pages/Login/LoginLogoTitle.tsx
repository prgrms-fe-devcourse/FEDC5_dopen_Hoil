import { Box, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react';

const LoginLogoTitle = () => {
  const dopenLogo = useColorModeValue(
    '/assets/dopenLogo.svg',
    '/assets/dopenWhiteLogo.svg',
  );

  return (
    <Box mb="36px">
      <Heading as="h2" mb="17px">
        <Image m="0 auto" w="198px" src={dopenLogo} alt="Dopen Logo" />
      </Heading>
      <Box fontSize="md">
        <Text as="strong" fontSize="4xl" color="pink.300">
          안녕하세요 회원님
        </Text>
        <Text mt="15px">dopen에 오신것을 환영합니다.</Text>
      </Box>
    </Box>
  );
};

export default LoginLogoTitle;
