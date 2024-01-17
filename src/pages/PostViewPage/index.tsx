import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Spinner } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import PostDetail from './PostDetail';
import ErrorFallback from './ErrorFallback';
import { useParams } from 'react-router-dom';

const PostViewPage = () => {
  const { reset } = useQueryErrorResetBoundary();
  const { boardName } = useParams();
  const headerName = () => {
    if (boardName === 'free') {
      return '자유 게시판';
    } else {
      return '정보 공유 게시판';
    }
  };
  return (
    <>
      <PageHeader pageName={headerName()} />

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<Spinner />}>
          <PostDetail />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PostViewPage;
