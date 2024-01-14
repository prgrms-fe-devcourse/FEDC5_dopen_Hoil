import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { MYPOST_LIST, POST_DETAIL } from '@/constants/queryKeys';
import { checkAuthenticated } from '@/apis/authentication';
import {
  createPost,
  editPost,
  getPostDetail,
  ChannelPayload,
  getPostListByChannel,
} from '@/apis/post';
import { Post } from '@/apis/type';

interface PostDetailProps {
  id: string;
  enabled?: boolean;
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

export const usePostDetail = ({ id, enabled }: PostDetailProps) => {
  return useQuery(POST_DETAIL, async () => await getPostDetail(id), {
    enabled,
  });
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

export const useFirstPost = ({
  channelId,
  offset = 0,
  limit = 1,
}: ChannelPayload) => {
  const {
    data = [],
    isError,
    isLoading,
  } = useQuery<Post[], AxiosError>(`${channelId}`, async () => {
    return await getPostListByChannel({ channelId, offset, limit });
  });

  const firstPost = data[0];

  return { firstPost, isError, isLoading };
};
