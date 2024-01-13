import { Grid, GridProps, Tooltip } from '@chakra-ui/react';
import GrassCell from './GrassCell';
import { useMemo } from 'react';

interface GrassProps extends GridProps {
  timerPosts: { time: string; createdAt: string }[]; // 추후 Post[]로 변경필요
}

const DUMMY_DATA = [
  { time: '06:07:00', createdAt: '2024-01-01T20:48:19.816Z' },
  { time: '02:00:00', createdAt: '2024-01-04T20:48:19.816Z' },
  { time: '05:07:00', createdAt: '2024-01-05T20:48:19.816Z' },
  { time: '12:07:00', createdAt: '2024-01-10T20:48:19.816Z' },
];

const getGrassPercentage = (value: number, standard: number = 12) => {
  const flooredStandard = Math.floor(standard / 4);
  if (value < flooredStandard) {
    return 0.25;
  }
  if (value < flooredStandard * 2) {
    return 0.5;
  }
  if (value < flooredStandard * 3) {
    return 0.75;
  }
  return 1;
};

const Grass = ({ timerPosts = DUMMY_DATA }: GrassProps) => {
  const today = new Date();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  //회고 게시글을 이번 달 기준으로 filter해서 가져온다. 글 존재하면 percentage계산해서 배열화하면 됨
  const thisMonthTimerData = useMemo(() => {
    const tempData = Array(lastDay).fill(0);

    timerPosts.forEach(({ time, createdAt }) => {
      const [hours] = time.split(':').map(Number);
      const [createdYear, createdMonth, createdDay] = new Date(createdAt)
        .toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .split('-');

      //0번 인덱스 기준이라 날짜에서 1을 빼줍니다
      tempData[+createdDay - 1] = {
        percentage: getGrassPercentage(hours),
        time: `${createdYear}년 ${createdMonth}월 ${createdDay}일`,
      };
    });

    return tempData;
  }, [timerPosts, lastDay]);

  return (
    <Grid templateColumns="repeat(7, fit-content(20px))" gap="5px">
      {thisMonthTimerData.map(({ percentage, time }, index) => (
        <Tooltip key={`day-${index}`} label={time ? time : '회고 기록 없음'}>
          <GrassCell percentage={percentage} borderRadius="2px" />
        </Tooltip>
      ))}
    </Grid>
  );
};

export default Grass;
