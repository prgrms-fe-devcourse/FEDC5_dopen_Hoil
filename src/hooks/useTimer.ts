import { stringTimeToSeconds } from '@/utils/stringTimeToSeconds';
import { useRef, useState } from 'react';

const useTimer = (initialTime: string = '00:00:00') => {
  //setInterval의 반환 타입 추론
  const setIntervalId = useRef<ReturnType<typeof setInterval>>();
  const [timer, _setTimer] = useState(initialTime);
  const [isPlay, setIsPlay] = useState(false);
  const [isTimerEnd, setIsTimerEnd] = useState(false);
  const timerRef = useRef(timer);

  const setTimer = (time: string) => {
    _setTimer(time);
    timerRef.current = time;
  };

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

  const stopTimer = () => {
    if (setIntervalId.current) {
      clearInterval(setIntervalId.current);
      setIntervalId.current = undefined;
      setIsPlay(false);
    }
  };

  const startTimer = (deadline: Date = getDeadLineTime(timer)) => {
    if (setIntervalId.current) {
      return;
    }

    setIsPlay(true);
    const id = setInterval(() => {
      const { total, hours, minutes, seconds } = getTimeRemaining(deadline);
      if (total > 0) {
        setIsTimerEnd(false);
        setTimer(`${hours}:${minutes}:${seconds}`);
      } else if (total === 0) {
        setTimer(`${hours}:${minutes}:${seconds}`);
        stopTimer();
        setIsTimerEnd(true);
        setTimeout(() => setIsTimerEnd(false));
      }
    }, 1000);

    setIntervalId.current = id;
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(initialTime);
  };

  const getDeadLineTime = (deadline: string): Date => {
    const deadLineToSeconds = stringTimeToSeconds(deadline);
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + deadLineToSeconds);
    return currentDate;
  };

  return {
    timer,
    startTimer,
    stopTimer,
    resetTimer,
    isPlay,
    setTimer,
    isTimerEnd,
    timerRef,
  };
};

export default useTimer;
