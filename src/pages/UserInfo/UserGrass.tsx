import { Box, FormLabel, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { MdCalendarMonth } from 'react-icons/md';
import Grass from '@/components/Grass';
import { User } from '@/apis/type';
import { useStudyPost } from '@/hooks/useStudy';

interface UserGrassProps {
  userInfo: User;
}

const UserGrass = ({ userInfo }: UserGrassProps) => {
  const { fullName: studyTimeData } = userInfo;
  const { timerChannelId } = JSON.parse(studyTimeData);
  const { studyPost = [] } = useStudyPost({ channelId: timerChannelId });

  const studyPosts = studyPost.map(({ title, createdAt }) => ({
    time: title,
    createdAt,
  }));

  const todayDate = getFormattedDate();

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <Box display="grid" placeItems="center" mt="40px" p="0 20px">
      <GrassCalendar>
        <FormLabel htmlFor="dateInput">
          <Text as="span">{`${todayDate.split('-')[0]}년 ${
            todayDate.split('-')[1]
          }월`}</Text>
          <MdCalendarMonth />
        </FormLabel>
      </GrassCalendar>
      <Grass timerPosts={studyPosts} />
    </Box>
  );
};

const GrassCalendar = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  margin-bottom: 20px;

  label {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 26px;
    z-index: -1;

    span {
      font-size: 22px;
      padding-right: 5px;
    }

    svg {
      width: 26px;
    }
  }

  input[type='date'] {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    outline: none;

    ::-webkit-calendar-picker-indicator {
      transform: translateX(-10px);
      padding-left: 3000px;
      display: block;
      height: 100%;
    }
  }
`;

export default UserGrass;
