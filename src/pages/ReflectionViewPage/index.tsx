import PageHeader from '@/components/PageHeader';
import ReflectionDetail from './ReflectionDetail';
import { ErrorBoundary } from 'react-error-boundary';
import { Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import ErrorFallback from '../PostViewPage/ErrorFallback';
import { useQueryErrorResetBoundary } from 'react-query';

const ReflectionViewPage = () => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <>
      <PageHeader pageName="회고"></PageHeader>
      <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Spinner />}>
          <ReflectionDetail />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default ReflectionViewPage;
