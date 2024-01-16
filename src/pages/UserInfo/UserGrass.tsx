import { Box } from '@chakra-ui/react';
import { User } from '@/apis/type';
import { useStudyPost } from '@/hooks/useStudy';
import Grass from '@/components/Grass';

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

  return (
    <Box display="grid" placeItems="center" mt="40px" p="0 20px">
      <Grass timerPosts={studyPosts} />
    </Box>
  );
};

export default UserGrass;
