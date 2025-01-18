import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import Views from '@/views';
import { ProductSelectionProvider } from './productSelectionProvider.jsx';
import { ClusterSelectionProvider } from './clusterSelectionProvider.jsx';
import { AppProvider } from './appProvider.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const UserValidationWrapper = ({ children }) => children;

function RouterView() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ProductSelectionProvider>
          <ClusterSelectionProvider>
            <Views />
            <ToastContainer
              position="bottom-right"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick={false}
              rtl
              pauseOnFocusLoss
              pauseOnHover
              theme="light"
            />
          </ClusterSelectionProvider>
        </ProductSelectionProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default RouterView;
