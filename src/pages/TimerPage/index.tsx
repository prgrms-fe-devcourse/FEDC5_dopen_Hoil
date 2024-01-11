import { createPost, editPost } from '@/apis/post';
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
import { useTodayTimePost } from '@/hooks/useTodayTimePost';
import { secondsToStringTime } from '@/utils/secondsToStringTime';

const DUMMY_DATA = {
  userId: '658b73f0fadd1520147a8d64',
  email: 'test@test.com',
  password: '12341234',
  timerChannelId: '659cbef85b11b0431d028400',
};

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

const TimerPage = () => {
  const { timer, isPlay, isEnd, startTimer, stopTimer, setTimer } = useTimer();

  const {
    data: todayTimePost,
    refetch,
    isSuccess,
  } = useTodayTimePost(DUMMY_DATA.timerChannelId);

  const targetTime = useRef(timer);

  useEffect(() => {
    const { time } = getItem('timer', { time: '00:00:00' });

    setTimer(time);

    targetTime.current = time;
  }, [setTimer]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutate: onCreatePost } = useMutation(
    ['create-timer-post'],
    (time: string) =>
      createPost({
        title: time,
        channelId: DUMMY_DATA.timerChannelId,
      }),
    {
      onSuccess: () => refetch(),
    },
  );

  const { mutate: onEditPost } = useMutation(
    'edit-timer-post',
    ({ postId, title }: { postId: string; title: string }) =>
      editPost({
        postId,
        title,
        channelId: DUMMY_DATA.timerChannelId,
      }),
    { onSuccess: () => refetch() },
  );

  const onPause = () => {
    /* 
      1. 오늘자 타이머게시글이 존재한다면 수정하고 아니라면 생성해준다.
      2. 있다면 오늘자 게시글의 제목을 가져와서 현재 소비한 시간과 더해준 후 다시 제목으로 넣어줌   
,
    */
    if (!isSuccess) {
      //에러처리필요
      stopTimer();
      targetTime.current = timer;
      return;
    }
    const currentSpendTime =
      stringTimeToSeconds(targetTime.current) - stringTimeToSeconds(timer);
    if (todayTimePost) {
      const { _id, title } = todayTimePost;
      const totalSpendTime = currentSpendTime + stringTimeToSeconds(title);
      onEditPost({ postId: _id, title: secondsToStringTime(totalSpendTime) });
    } else {
      //생성하기
      onCreatePost(secondsToStringTime(currentSpendTime));
    }
    stopTimer();
    if (stringTimeToSeconds(timer) > 0) {
      targetTime.current = timer;
    }
  };

  if (isEnd) {
    onPause();
  }

  return (
    <Flex flexDir="column" align="center" w="100%" bg="pink.200">
      <PageHeader pageName="타이머" />
      <Center p="97px 0" position="relative" w="100%">
        <CircularProgress
          value={
            stringTimeToSeconds(targetTime.current.toString()) -
            stringTimeToSeconds(timer)
          }
          color="black"
          size="400px"
          thickness="1px"
          max={stringTimeToSeconds(targetTime.current)}
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
            onClick={() => onPause()}
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
          targetTime={targetTime}
        />
      </VStack>
    </Flex>
  );
};

export default TimerPage;
