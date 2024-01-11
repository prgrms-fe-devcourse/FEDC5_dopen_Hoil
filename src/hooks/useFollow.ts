import { useMutation } from 'react-query';
import { followUser, unfollowUser } from '@/apis/follow';
import { CREATE_FOLLOW, DELETE_FOLLOW } from '@/constants/queryKeys';

interface FollowProps {
  id: string;
}

export const useCreateFollow = ({ id }: FollowProps) => {
  return useMutation(CREATE_FOLLOW, async () => {
    await followUser(id);
  });
};

export const useDeleteFollow = ({ id }: FollowProps) => {
  return useMutation(DELETE_FOLLOW, async () => {
    await unfollowUser(id);
  });
};
