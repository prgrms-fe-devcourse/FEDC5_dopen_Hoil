import { Grid, GridProps } from '@chakra-ui/react';
import GrassCell from './GrassCell';
import { Post } from '@/apis/type';

interface GrassProps extends GridProps {
  timerPosts: Post[];
}

/* 

[{1월1일자 타이머},{1월 3일자 타이머}] 이런식으로 getPostListByChannel로 가져올텐데, 이걸 가공해서 써야함.
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Grass = ({ timerPosts }: GrassProps) => {
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
