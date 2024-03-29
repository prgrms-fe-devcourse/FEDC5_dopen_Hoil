import { createPost, editPost } from '@/apis/post';
import PageHeader from '@/components/PageHeader';

import useTimer from '@/hooks/useTimer';
import { getItem, setItem } from '@/utils/storage';
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
import { UseQueryResult, useMutation } from 'react-query';
import TimerSettingModal from './TimerSettingModal';
import { stringTimeToSeconds } from '@/utils/stringTimeToSeconds';
import { useTodayTimePost } from '@/hooks/useTodayTimePost';
import { secondsToStringTime } from '@/utils/secondsToStringTime';
import { convertDateToString } from '@/utils/convertDateToString';
import { getCurrentStringTime } from '@/utils/getCurrentStringTime';
import { TIME_OUT_VALUE } from '@/constants/time';
import { useOutletContext } from 'react-router-dom';
import { User } from '@/apis/type';

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
  const { timer, isPlay, timerRef, startTimer, stopTimer, setTimer } = useTimer(
    {
      timerEndCallback: () => onPause(),
      limitTime: TIME_OUT_VALUE,
    },
  );

  const { data: myInfo, isSuccess } = useOutletContext<UseQueryResult<User>>();

  const { timerChannelId } = isSuccess && JSON.parse(myInfo?.fullName);

  const {
    data: todayTimePost,
    refetch,
    isError: isTodayTimePostError,
  } = useTodayTimePost(timerChannelId);

  const currentTargetTime = useRef(timer);
  const originTargetTime = useRef(timer);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutate: onCreatePost } = useMutation(
    ['create-timer-post'],
    (time: string) =>
      createPost({
        title: time,
        channelId: timerChannelId,
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
        channelId: timerChannelId,
      }),
    { onSuccess: () => refetch() },
  );

  const onPause = () => {
    //1초라도 경과했는지 판별 후 로직 실행합니다. 아무런 행동없이 새로고침하면 로직을 실행하지 않습니다
    if (
      stringTimeToSeconds(currentTargetTime.current) -
        stringTimeToSeconds(timerRef.current) <=
      0
    ) {
      return;
    }

    //로컬에 먼저 저장합니다

    setItem('timer', {
      time: timerRef.current,
      originTime: originTargetTime.current,
      date: convertDateToString(new Date()).date,
    });

    if (isTodayTimePostError) {
      //오늘자 타이머 게시글 가져올때 성공하지 못했을때. 에러처리필요
      stopTimer();
      currentTargetTime.current = timer;
      return;
    }
    const currentSpendTime =
      stringTimeToSeconds(currentTargetTime.current) -
      stringTimeToSeconds(timerRef.current); // 타이머를 이용한 시간.

    //게시글 있다면 수정
    if (todayTimePost) {
      const { _id, title } = todayTimePost;
      const totalSpendTime = currentSpendTime + stringTimeToSeconds(title);
      onEditPost({ postId: _id, title: secondsToStringTime(totalSpendTime) });
    } else {
      //게시글이 없다면 생성
      onCreatePost(secondsToStringTime(currentSpendTime));
    }

    stopTimer();
    //circularProgress의 퍼센테이지가 잘 작동하기 위하여 0 초과일때만 할당.
    //할당하지 않는다면 소비한시간 계산할때 처음 설정시간 - 지금시간을 계속 더해서 이상해집니다
    if (stringTimeToSeconds(timerRef.current) > 0) {
      currentTargetTime.current = timerRef.current;
    }
  };

  //타이머 끝나면 실행

  const preventEvent = (e: BeforeUnloadEvent) => e.preventDefault();

  useEffect(() => {
    //어제자 저장기록은 무시해야하는지...
    const { time, originTime } = getItem('timer', {
      time: '00:00:00',
      originTime: '00:00:00',
      date: convertDateToString(new Date()).date,
    });
    setTimer(time);

    currentTargetTime.current = time;
    originTargetTime.current = originTime;

    window.addEventListener('beforeunload', preventEvent);

    return () => window.removeEventListener('beforeunload', preventEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flexDir="column" align="center" w="100%" bg="pink.200" flex={1}>
      <PageHeader pageName="타이머" bg="pink.300" />
      <Center p="97px 0" position="relative" w="100%">
        <CircularProgress
          value={
            stringTimeToSeconds(originTargetTime.current.toString()) -
            stringTimeToSeconds(timer)
          }
          color="pink.300"
          size="400px"
          thickness="1px"
          max={stringTimeToSeconds(originTargetTime.current)}
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
            isDisabled={
              stringTimeToSeconds(timer) <= 0 ||
              stringTimeToSeconds(TIME_OUT_VALUE) -
                stringTimeToSeconds(getCurrentStringTime()) <=
                0
            }
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
          onClick={() => {
            isPlay && onPause();
            onOpen();
          }}
        >
          타이머 설정
        </Button>
        <TimerSettingModal
          isOpen={isOpen}
          onClose={onClose}
          setTimer={setTimer}
          currentTargetTime={currentTargetTime}
          originTargetTime={originTargetTime}
        />
      </VStack>
    </Flex>
  );
};

export default TimerPage;
