import { Grid } from '@chakra-ui/react';
import GrassCell from './GrassCell';

const Grass = () => {
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
