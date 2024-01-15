import { Suspense } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Spinner } from '@chakra-ui/react';
import PageHeader from '@/components/PageHeader';
import PostDetail from './PostDetail';
import ErrorFallback from './ErrorFallback';

const PostViewPage = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <>
      <PageHeader pageName="post" />

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<Spinner />}>
          <PostDetail />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PostViewPage;
