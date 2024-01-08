import PageHeader from '@/components/PageHeader';
import MyModal from '@/components/common/MyModal';
import useTimer from '@/hooks/useTimer';
import {
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  IconButtonProps,
  Input,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Path, RegisterOptions, useForm } from 'react-hook-form';
import { MdPause, MdPlayArrow } from 'react-icons/md';

const TEST_TIME = '01:00:05';

interface TimerInputTypes {
  hour: string;
  minute: string;
  second: string;
}

interface TimerInputMetaDataTypes {
  name: Path<TimerInputTypes>;
  validate?: RegisterOptions;
}

const TimerPage = () => {
  const { timer, startTimer, stopTimer, isPlay } = useTimer(TEST_TIME);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const timeInputMetaData: TimerInputMetaDataTypes[] = [
    {
      name: 'hour',
      validate: {
        pattern: {
          value: /^[0-2]?[0-3]$/,
          message: '00~23사이 숫자만 가능합니다',
        },
        maxLength: {
          value: 2,
          message: '숫자는 두개까지 입력 가능합니다',
        },
      },
    },
    {
      name: 'minute',
      validate: {
        pattern: {
          value: /^[0-5]?[0-9]$/,
          message: '00~59사이 숫자만 가능합니다',
        },
        maxLength: {
          value: 2,
          message: '숫자는 두개까지 입력 가능합니다',
        },
      },
    },
    {
      name: 'second',
      validate: {
        pattern: {
          value: /^[0-5]?[0-9]$/,
          message: '00~59사이 숫자만 가능합니다',
        },
        maxLength: {
          value: 2,
          message: '숫자는 두개까지 입력 가능합니다',
        },
      },
    },
  ];

  const {
    handleSubmit,
    register,
    /* getValues, */
    formState: { errors, isValid },
  } = useForm<TimerInputTypes>({
    defaultValues: {
      hour: '00',
      minute: '00',
      second: '00',
    },
  });

  const timerIconStyle: IconButtonProps = {
    position: 'absolute',
    left: '50%',
    bottom: '35px',
    transform: 'translate(-50%, -50%)',
    boxSize: '100px',
    borderRadius: '50%',
    bg: 'pink.300',
    _hover: { bg: 'pink.400' },
    'aria-label': '',
  };

  const onSubmit = () => {};

  return (
    <Flex flexDir="column" align="center" w="100%" bg="pink.200">
      <PageHeader pageName="타이머" />
      <Center p="97px 0" position="relative" w="100%">
        <CircularProgress value={50} color="black" size="400px" thickness="1px">
          <CircularProgressLabel
            fontWeight="bold"
            color="white"
            fontSize="6.6rem"
          >
            {timer}
          </CircularProgressLabel>
        </CircularProgress>
        {isPlay ? (
          <IconButton
            {...timerIconStyle}
            aria-label="멈춤"
            icon={<Icon as={MdPause} color="white" boxSize="50px" />}
            onClick={() => stopTimer()}
          />
        ) : (
          <IconButton
            {...timerIconStyle}
            aria-label="재생"
            icon={<Icon as={MdPlayArrow} color="white" boxSize="50px" />}
            onClick={() => startTimer()}
          />
        )}
      </Center>
      <VStack pb="155px" spacing="22px">
        <Button
          color="white"
          bg="pink.300"
          w="388px"
          h="70px"
          _hover={{ bg: 'pink.400' }}
          onClick={onOpen}
        >
          타이머 설정
        </Button>
        <MyModal
          title="타이머 설정"
          isOpen={isOpen}
          onClose={onClose}
          buttonText="타이머 설정하기"
          onButtonClick={() => {}}
          isCentered
        >
          <form
            style={{
              display: 'flex',
              height: '100%',
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {timeInputMetaData.map(({ name, validate }) => (
              <FormControl isInvalid={!!errors?.[name]?.message} key={name}>
                <Input
                  id={name}
                  type="number"
                  {...register(name, {
                    required: '시간을 설정해주세요',
                    ...validate,
                  })}
                />
                <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
              </FormControl>
            ))}
            <Button
              h="modal.button.h"
              w="modal.button.w"
              bg="pink.100"
              mb="28px"
              color="pink.300"
              fontSize="1.4rem"
              type="submit"
            >
              타이머 설정하기
            </Button>
          </form>
        </MyModal>
        <Button
          color="white"
          bg="pink.300"
          w="388px"
          h="70px"
          _hover={{ bg: 'pink.400' }}
          disabled={!isValid}
        >
          스톱워치로 전환
        </Button>
      </VStack>
    </Flex>
  );
};

export default TimerPage;
