import { Grid, GridProps, HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import GrassCell from './GrassCell';
import { useMemo } from 'react';
import { calcGrassPercentage } from '@/utils/calcGrassPercentage';
import { MdCalendarMonth } from 'react-icons/md';

interface GrassProps extends GridProps {
  timerPosts: { time: string; createdAt: string }[]; // 추후 TimerPost[]로 변경필요
}

const Grass = ({ timerPosts = [] }: GrassProps) => {
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
        percentage: calcGrassPercentage(hours),
        time: `${createdYear}년 ${createdMonth}월 ${createdDay}일`,
      };
    });

    return tempData;
  }, [timerPosts, lastDay]);

  const [year, month] = today
    .toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('-');

  return (
    <>
      <HStack justify="center" mb="10px">
        <Text
          fontSize="1.8rem"
          fontWeight="bold"
        >{`${year}년 ${month}월`}</Text>
        <Icon as={MdCalendarMonth} boxSize="20px" />
      </HStack>
      <Grid
        templateColumns="repeat(7, fit-content(20px))"
        gap="5px"
        justifyContent="center"
      >
        {thisMonthTimerData.map(({ percentage, time }, index) => (
          <Tooltip key={`day-${index}`} label={time ? time : '회고 기록 없음'}>
            <GrassCell percentage={percentage} borderRadius="2px" />
          </Tooltip>
        ))}
      </Grid>
    </>
  );
};

export default Grass;
