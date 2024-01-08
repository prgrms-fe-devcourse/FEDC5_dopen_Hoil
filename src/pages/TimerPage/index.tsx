import { Button, Heading } from '@chakra-ui/react';
import { useRef, useState } from 'react';

const INITIAL_TIME = '00:00:00';
const TEST_DEADLINE = '00:01:10';

const TimerPage = () => {
  //setInterval의 반환 타입 추론
  const Ref = useRef<ReturnType<typeof setInterval>>();

  const [timer, setTimer] = useState(INITIAL_TIME);

  const getTimeRemaining = (deadline: Date) => {
    //total밀리초가 1000단위로 딱 떨어지지 않기에 올림처리
    const total = Math.ceil((deadline.getTime() - Date.now()) / 1000) * 1000;

    //나중에 합쳐지면 calculateTimeDiff함수 이용(padStart는 함수 인자로 옵션줘서 해결하면 될거같다)
    const seconds = Math.floor((total / 1000) % 60)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((total / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0');
    const hours = Math.floor((total / 1000 / 60 / 60) % 24)
      .toString()
      .padStart(2, '0');
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (deadline: Date) => {
    const id = setInterval(() => {
      const { total, hours, minutes, seconds } = getTimeRemaining(deadline);
      if (total >= 0) {
        setTimer(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    Ref.current = id;
  };

  const stopTimer = () => {
    if (Ref.current) {
      clearInterval(Ref.current);
    }
  };

  const resetTimer = () => {
    setTimer(TEST_DEADLINE);
  };

  const getDeadLineTime = (deadline: string): Date => {
    /* 
    1. 유저에게서 hh:mm:ss형태의 값을 받아온다.
    2. 현재시각에서 hh:mm:ss를 추출한뒤, 유저에게서 받아온 값을 더해준다.
      2-1. 23:59가 넘어가면 안된다.
      2-2. 넘어가지 않는다면 3번으로
    3. 더한 시간을 리턴해준다
    */
    const [hours, minutes, seconds] = deadline.split(':').map(Number);
    const deadLineToSeconds = seconds + minutes * 60 + hours * 60 * 24;
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + deadLineToSeconds);
    return currentDate;
  };

  return (
    <>
      <Heading>{timer}</Heading>
      <Button onClick={() => resetTimer()}>리셋</Button>
      <Button onClick={() => stopTimer()}>멈춤</Button>
      <Button
        onClick={() => startTimer(getDeadLineTime(timer || TEST_DEADLINE))}
      >
        시작
      </Button>
    </>
  );
};

export default TimerPage;
