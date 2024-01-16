import { useQuery } from 'react-query';
import { getPostListByChannel } from '@/apis/post';
import { STUDY_POST } from '@/constants/queryKeys';

interface StudyProps {
  channelId: string;
}

export const useStudyPost = ({ channelId }: StudyProps) => {
  const { data } = useQuery(
    STUDY_POST,
    async () => await getPostListByChannel({ channelId }),
  );

  return {
    studyPost: data,
  };
};
