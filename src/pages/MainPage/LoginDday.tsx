import MyModal from '@/components/common/MyModal';
import {
  Box,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

const LoginDday = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      padding="10px 20px"
      color="white"
      fontWeight="bold"
      alignItems="center"
      justifyContent="space-between"
      onClick={onOpen}
    >
      <Text fontSize="2xl">데브코스 수료식</Text>
      <Box>
        <Text fontSize="2xl">D-83</Text>
        <Text fontSize="lg" fontWeight="normal">
          2024.03.25
        </Text>
      </Box>
      <MyModal
        onClose={onClose}
        isOpen={isOpen}
        title="D-DAY"
        buttonText="D-day 등록하기"
        onButtonClick={() => {}}
      >
        <form style={{ padding: '0 20px' }}>
          <FormControl>
            <FormLabel p="12px 0">D-Day 명을 작성해주세요.</FormLabel>
            <InputGroup>
              <Input h="40px" p="0 18px" />
              <InputRightElement h="100%" right="18px">
                <CloseButton bg="gray.700" borderRadius="50%" color="white" />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel p="12px 0">날짜를 선택해주세요.</FormLabel>
            <Input type="date" p="0 18px" h="40px" w="135px" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </form>
      </MyModal>
    </Flex>
  );
};

export default LoginDday;
