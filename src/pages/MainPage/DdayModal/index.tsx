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
import { useForm } from 'react-hook-form';

interface DdayModalInputTypes {
  dDayTitle: string;
  dDayDate: Date;
}

const DdayModal = ({
  isOpen,
  onClose,
}: Pick<MyModalProps, 'isOpen' | 'onClose'>) => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<DdayModalInputTypes>();

  const onSuccess = () => {};

  return (
    <MyModal
      onClose={onClose}
      isOpen={isOpen}
      title="D-DAY"
      buttonText="D-day 등록하기"
      onButtonClick={() => handleSubmit(onSuccess)}
      isCentered
    >
      <form style={{ padding: '0 20px' }}>
        <FormControl isInvalid={!!errors.dDayTitle}>
          <FormLabel htmlFor="dDayTitle" p="12px 0">
            D-Day 명을 작성해주세요.
          </FormLabel>
          <InputGroup>
            <Input
              id="dDayTitle"
              h="40px"
              p="0 18px"
              {...register('dDayTitle', {
                required: 'd-day 명을 작성해주세요!',
                minLength: {
                  value: 1,
                  message: '최소 1글자 이상 입력해주세요',
                },
                maxLength: {
                  value: 20,
                  message: '최대 20글자까지 가능합니다',
                },
              })}
            />
            <InputRightElement h="100%" right="18px">
              <CloseButton
                bg="gray.700"
                borderRadius="50%"
                color="white"
                onClick={() => resetField('dDayTitle')}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.dDayDate?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.dDayDate}>
          <FormLabel htmlFor="dDayDate" p="12px 0">
            날짜를 선택해주세요.
          </FormLabel>
          <Input
            id="dDayDate"
            type="date"
            p="0 18px"
            h="40px"
            w="135px"
            {...register('dDayDate', {
              required: 'd-day날짜를 기입해주세요',
            })}
          />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
      </form>
    </MyModal>
  );
};

export default DdayModal;
