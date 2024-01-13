import { Grid, GridProps } from '@chakra-ui/react';
import GrassCell from './GrassCell';
import { Post } from '@/apis/type';

interface GrassProps extends GridProps {
  timerPosts: Post[];
}

const DUMMY_DATA = [
  { title: '06:07:00', createdAt: '2024-01-01T20:48:19.816Z' },
  { title: '02:00:00', createdAt: '2024-01-04T20:48:19.816Z' },
  { title: '06:07:00', createdAt: '2024-01-05T20:48:19.816Z' },
  { title: '12:07:00', createdAt: '2024-01-10T20:48:19.816Z' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Grass = ({ timerPosts = DUMMY_DATA }: GrassProps) => {
  const today = new Date();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();
  //게시글 filter로 뽑아와서 1월달 글 존재하면 percentage계산해서 배열화하면 됨
  const thisMonthTimerData = [...Array(lastDay)];
  return (
    <Grid
      templateColumns="repeat(7, fit-content(20px))"
      gap={2}
      p={4}
      maxW="428px"
    >
      {thisMonthTimerData.map((_, index) => (
        <GrassCell key={`day-${index}`} percentage={1} />
      ))}
    </Grid>
  );
};

export default Grass;
