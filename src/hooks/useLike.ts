import { createLike, deleteLike } from '@/apis/post';
import { POST_DETAIL } from '@/constants/queryKeys';
import { useMutation, useQueryClient } from 'react-query';

//일단 유저의 Like에서 눌렀는지를 찾아야함

const useCreateLike = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(async (id: string) => await createLike(id), {
    retry: 0,
    onSuccess: () => {
      queryClient.refetchQueries(POST_DETAIL);
    },
    onError: () => {
      alert('잠시후에 다시 시도해주세요');
    },
  });
  return mutate;
};

const useDeleteLike = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(async (id: string) => await deleteLike(id), {
    retry: 0,
    onSuccess: () => {
      queryClient.refetchQueries(POST_DETAIL);
    },
    onError: () => {
      alert('잠시후에 다시 시도해주세요');
    },
  });
  return mutate;
};

export const useLike = () => {
  const setLike = useCreateLike();
  const setDislike = useDeleteLike();
  return { setLike, setDislike };
};
