import {QueryClient, QueryClientProvider} from 'react-query';
import Views from '@/views';
import {LoadingProvider} from '@/services/loading';
import {ThemeProvider} from '@/services/themeMode';
import {ProductSelectionProvider} from './productSelectionProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

function RouterView() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LoadingProvider>
          <ProductSelectionProvider>
            <Views />
          </ProductSelectionProvider>
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default RouterView;
