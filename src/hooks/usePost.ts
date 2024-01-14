import { useMutation, useQuery } from 'react-query';
import { MYPOST_LIST, POST_DETAIL } from '@/constants/queryKeys';
import { checkAuthenticated } from '@/apis/authentication';
import { createPost, editPost, getPostDetail } from '@/apis/post';

interface PostDetailProps {
  id: string;
}

interface PostingProps {
  onSuccessFn?: () => void;
}

export const useMyPostList = () => {
  return useQuery(MYPOST_LIST, async () => {
    const { posts } = await checkAuthenticated();

    return posts;
  });
};

export const usePostDetail = ({ id }: PostDetailProps) => {
  return useQuery(POST_DETAIL, async () => await getPostDetail(id));
};

export const usePosting = ({ onSuccessFn }: PostingProps) => {
  return useMutation(createPost, {
    onSuccess: () => {
      if (onSuccessFn) {
        onSuccessFn();
      }
    },
    onError: () => {
      alert('글 등록 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};

export const useEditPost = ({ onSuccessFn }: PostingProps) => {
  return useMutation(editPost, {
    onSuccess: () => onSuccessFn?.(),
    //인증관련 에러일때만 useBoundaryTrue로
  });
};
