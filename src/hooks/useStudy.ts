import { useQuery } from 'react-query';
import { getPostListByChannel } from '@/apis/post';
import { STUDY_DAY, STUDY_POST } from '@/constants/queryKeys';

interface StudyProps {
  channelId: string;
}

export const useStudyDay = ({ channelId }: StudyProps) => {
  const { data } = useQuery(
    STUDY_DAY,
    async () => {
      const studyPost = await getPostListByChannel({ channelId });
      return studyPost;
    },
    {
      select: (studyPost) => {
        const studyDay = studyPost.map((post) => post.createdAt.split('T')[0]);
        return studyDay;
      },
    },
  );

  return data;
};

export const useStudyPost = ({ channelId }: StudyProps) => {
  const { data } = useQuery(
    STUDY_POST,
    async () => await getPostListByChannel({ channelId }),
  );

  return {
    studyPost: data,
  };
};
