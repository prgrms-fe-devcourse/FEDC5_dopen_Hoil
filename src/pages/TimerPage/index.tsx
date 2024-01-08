import useTimer from '@/hooks/useTimer';
import { Button, Heading } from '@chakra-ui/react';

const TEST_TIME = '00:01:05';

const TimerPage = () => {
  //setInterval의 반환 타입 추론
  const { timer, resetTimer, stopTimer, startTimer } = useTimer(TEST_TIME);
  return (
    <>
      <Heading>{timer}</Heading>
      <Button onClick={() => resetTimer()}>리셋</Button>
      <Button onClick={() => stopTimer()}>멈춤</Button>
      <Button onClick={() => startTimer()}>시작</Button>
    </>
  );
};

export default TimerPage;
