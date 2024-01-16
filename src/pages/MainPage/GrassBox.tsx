import { User } from '@/apis/type';
import Grass from '@/components/Grass';
import { useStudyPost } from '@/hooks/useStudy';
import { Text } from '@chakra-ui/react';

interface GrassBoxProps {
  myInfo: User;
}

const GrassBox = ({ myInfo }: GrassBoxProps) => {
  const { fullName: studyTimeData } = myInfo;
  const { timerChannelId } = JSON.parse(studyTimeData);
  const { studyPost = [] } = useStudyPost({ channelId: timerChannelId });

  const studyPosts = studyPost.map(({ title, createdAt }) => ({
    time: title,
    createdAt,
  }));

  return (
    <>
      {!myInfo && (
        <Text fontSize="1.5rem" fontWeight="bold" color="black" mb="17px">
          여러분의 열정을 기록해 보세요.
        </Text>
      )}
      <Grass timerPosts={studyPosts} />
    </>
  );
};

export default GrassBox;
