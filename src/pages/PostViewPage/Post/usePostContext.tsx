import { createContext, useContext, ReactNode } from 'react';
import { Post } from '@/apis/type';
import { usePostDetail } from '@/hooks/usePost';

export const PostContext = createContext<Post | null>(null);

// eslint-disable-next-line
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === null) {
    throw new Error('context error');
  }
  return context;
};

const PostContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: postDetail } = usePostDetail({
    id: '6592deba5dbbe93b3a9a2b06',
  });

  if (postDetail === undefined) {
    return null;
  }

  return (
    <PostContext.Provider value={{ ...postDetail }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
