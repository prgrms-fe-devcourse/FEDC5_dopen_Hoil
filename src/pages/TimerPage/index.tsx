import { createPost } from '@/apis/post';
import PageHeader from '@/components/PageHeader';

import useTimer from '@/hooks/useTimer';
import { getItem } from '@/utils/storage';
import {
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Icon,
  IconButton,
  IconButtonProps,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { useMutation } from 'react-query';
import TimerSettingModal from './TimerSettingModal';
import { stringTimeToSeconds } from '@/utils/stringTimeToSeconds';

const DUMMY_DATA = {
  userId: '658b73f0fadd1520147a8d64',
  email: 'test@test.com',
  password: '12341234',
  timerChannelId: '659cbef85b11b0431d028400',
};

const TimerPage = () => {
  const { timer, startTimer, stopTimer, isPlay, setTimer } = useTimer();
  const timeBenchmark = useRef(timer);
  useEffect(() => {
    const { time } = getItem('timer', { time: '00:00:00' });
    setTimer(time);
    timeBenchmark.current = time;
  }, [setTimer]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const checkTimeOut = (value: string) => {
    const currentTime = new Date();
    const currentLimit =
      stringTimeToSeconds(TIME_OUT_VALUE) -
      stringTimeToSeconds(
        `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`,
      );
    const timeDiff = currentLimit - stringTimeToSeconds(value);
    return timeDiff >= 0 || '23:45까지만 설정 가능합니다.';
  };

  const timeInputMetaData: TimerInputMetaDataTypes[] = [
    {
      name: 'hour',
      validate: {
        pattern: {
          value: /^(0?[0-9]|1[0-9]|2[0-3])$/,
          message: '00~23사이 숫자만 가능합니다',
        },
        maxLength: {
          value: 2,
          message: '숫자는 두개까지 입력 가능합니다',
        },
        validate: () =>
          checkTimeOut(
            `${getValues().hour}:${getValues().minute}:${getValues().second}`,
          ),
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
        validate: () =>
          checkTimeOut(
            `${getValues().hour}:${getValues().minute}:${getValues().second}`,
          ),
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
        validate: () =>
          checkTimeOut(
            `${getValues().hour}:${getValues().minute}:${getValues().second}`,
          ),
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

  const { mutate } = useMutation(['timerPost'], async (time: string) => {
    return await createPost({
      title: JSON.stringify({ time }),
      channelId: DUMMY_DATA.timerChannelId,
    });
  });

  return (
    <Flex flexDir="column" align="center" w="100%" bg="pink.200">
      <PageHeader pageName="타이머" />
      <Center p="97px 0" position="relative" w="100%">
        <CircularProgress
          value={
            stringTimeToSeconds(timeBenchmark.current.toString()) -
            stringTimeToSeconds(timer)
          }
          color="black"
          size="400px"
          thickness="1px"
          max={stringTimeToSeconds(timeBenchmark.current)}
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
            isDisabled={stringTimeToSeconds(timer) <= 0}
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
        <TimerSettingModal
          isOpen={isOpen}
          onClose={onClose}
          setTimer={setTimer}
          mutate={mutate}
          timeBenchmark={timeBenchmark}
        />
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
