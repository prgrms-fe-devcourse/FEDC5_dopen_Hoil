import { Suspense } from 'react';

import '@fontsource/noto-sans-kr';

import PageLayout from '@/components/PageLayout';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/pages/PostViewPage/ErrorFallback';
import { useQueryErrorResetBoundary } from 'react-query';

import { Spinner } from '@chakra-ui/react';

import AppRouter from '@/router/router';

const App = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <PageLayout>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense
          fallback={
            <Spinner
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          }
        >
          <AppRouter />
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  );
};

export default App;
