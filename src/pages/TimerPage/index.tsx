import PageHeader from '@/components/PageHeader';
import MyModal from '@/components/common/MyModal';
import useTimer from '@/hooks/useTimer';
import {
  Box,
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
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Fragment, useRef } from 'react';
import { Path, RegisterOptions, useForm } from 'react-hook-form';
import { MdPause, MdPlayArrow } from 'react-icons/md';

const DEFAULT_TIME = '00:01:05';

const stringTimeToSeconds = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return seconds + minutes * 60 + hours * 3600;
};

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
  const { timer, startTimer, stopTimer, isPlay } = useTimer(DEFAULT_TIME);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const timeBenchmark = useRef(stringTimeToSeconds(DEFAULT_TIME));

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
    getValues,
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

  const onSubmit = () => {
    const { hour, minute, second } = getValues();
    const timeArr = [hour, minute, second].map((time) =>
      time.toString().padStart(2, '0'),
    );
    alert(timeArr);
  };

  const timeToPercentage = (time: string) => {
    const sumSeconds = stringTimeToSeconds(time);
    const percentage =
      100 - Math.round((sumSeconds / timeBenchmark.current) * 100);
    return percentage;
  };

  return (
    <Flex flexDir="column" align="center" w="100%" bg="pink.200">
      <PageHeader pageName="타이머" />
      <Center p="97px 0" position="relative" w="100%">
        <CircularProgress
          value={timeToPercentage(timer)}
          color="black"
          size="400px"
          thickness="1px"
        >
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
          onButtonClick={handleSubmit(() => onSubmit())}
          isCentered
        >
          <Box pl="20px" color="black">
            <Text fontSize="1.4rem" fontWeight="bold" m="14px 0">
              목표 시간을 설정해주세요
            </Text>
            <form
              style={{
                display: 'flex',
                height: '90px',
              }}
            >
              {timeInputMetaData.map(({ name, validate }, index) => (
                <Fragment key={name}>
                  <FormControl isInvalid={!!errors?.[name]?.message} w="100px">
                    <Input
                      id={name}
                      type="number"
                      {...register(name, {
                        required: '시간을 설정해주세요',
                        ...validate,
                      })}
                      h="70px"
                      fontSize="3rem"
                      textAlign="center"
                    />
                    <FormErrorMessage>
                      {errors?.[name]?.message}
                    </FormErrorMessage>
                  </FormControl>
                  {index !== timeInputMetaData.length - 1 && (
                    <Flex
                      fontSize="2rem"
                      color="#000000"
                      fontWeight="bold"
                      m="0 10px"
                      align="center"
                      h="60px"
                    >
                      :
                    </Flex>
                  )}
                </Fragment>
              ))}
            </form>
          </Box>
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
