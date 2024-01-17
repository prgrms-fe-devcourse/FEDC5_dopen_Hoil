import { User } from '@/apis/type';
import Grass from '@/components/Grass';
import { GRASS_DUMMY } from '@/constants/GrassDummy';
import { useStudyPost } from '@/hooks/useStudy';

interface LoginGrassBoxProps {
  myInfo: User;
}

const LoginGrassBox = ({ myInfo }: LoginGrassBoxProps) => {
  const timerChannelId = JSON.parse(myInfo.fullName).timerChannelId;
  const { studyPost = [] } = useStudyPost({
    channelId: timerChannelId,
  });
  const studyPosts = myInfo
    ? studyPost.map(({ title, createdAt }) => ({
        time: title,
        createdAt,
      }))
    : GRASS_DUMMY;

  return (
    <>
      <Grass timerPosts={studyPosts} />
    </>
  );
};

export default LoginGrassBox;
