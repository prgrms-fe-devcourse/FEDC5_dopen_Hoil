import MyModal, { MyModalProps } from '@/components/common/MyModal';
import {
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const DdayModal = ({
  isOpen,
  onClose,
}: Pick<MyModalProps, 'isOpen' | 'onClose'>) => {
  return (
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
  );
};

export default DdayModal;
