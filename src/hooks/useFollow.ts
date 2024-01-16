import { useMutation } from 'react-query';
import { followUser, unfollowUser } from '@/apis/follow';
import { CREATE_FOLLOW, DELETE_FOLLOW } from '@/constants/queryKeys';

interface FollowProps {
  id: string;
  onSuccessFn?: () => void;
}

export const useCreateFollow = ({ id, onSuccessFn }: FollowProps) => {
  return useMutation(
    CREATE_FOLLOW,
    async () => {
      await followUser(id);
    },
    {
      onSuccess: () => {
        if (onSuccessFn) {
          onSuccessFn();
        }
      },
    },
  );
};

export const useDeleteFollow = ({ id, onSuccessFn }: FollowProps) => {
  return useMutation(
    DELETE_FOLLOW,
    async () => {
      await unfollowUser(id);
    },
    {
      onSuccess: () => {
        if (onSuccessFn) {
          onSuccessFn();
        }
      },
    },
  );
};
