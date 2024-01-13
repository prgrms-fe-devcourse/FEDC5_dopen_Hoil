import { Grid, GridProps } from '@chakra-ui/react';
import GrassCell from './GrassCell';

interface GrassProps extends GridProps {
  timerPosts: { title: string; createdAt: string }[]; // 추후 Post[]로 변경필요
}

const DUMMY_DATA = [
  { title: '06:07:00', createdAt: '2024-01-01T20:48:19.816Z' },
  { title: '02:00:00', createdAt: '2024-01-04T20:48:19.816Z' },
  { title: '06:07:00', createdAt: '2024-01-05T20:48:19.816Z' },
  { title: '12:07:00', createdAt: '2024-01-10T20:48:19.816Z' },
];

const Grass = ({ timerPosts = DUMMY_DATA }: GrassProps) => {
  const today = new Date();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  //회고 게시글을 이번 달 기준으로 filter해서 가져온다. 글 존재하면 percentage계산해서 배열화하면 됨
  const thisMonthTimerData = Array(lastDay).fill(0);
  timerPosts.forEach(({ createdAt }) => {
    const [, , createdDay] = new Date(createdAt)
      .toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('-');

    //0번 인덱스 기준이라 날짜에서 1을 빼줍니다
    thisMonthTimerData[+createdDay - 1] = 1;
  });
  return (
    <Grid templateColumns="repeat(7, fit-content(20px))" gap="5px">
      {thisMonthTimerData.map((isRecorded, index) => (
        <GrassCell
          key={`day-${index}`}
          percentage={isRecorded ? 1 : 0}
          borderRadius="2px"
        />
      ))}
    </Grid>
  );
};

export default Grass;
