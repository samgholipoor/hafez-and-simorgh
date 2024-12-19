import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Error from '@/layouts/Error';
import views from '@/views';
import { LoadingProvider } from '@/services/loading';
import { ThemeProvider } from '@/services/themeMode';
import { ProductSelectionProvider } from './productSelectionProvider.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const UserValidationWrapper = ({ children }) => children;

export function RouterView() {
  const appRoutesList = views.map((View) => {
    const {
      routerConfig: { path },
    } = View;

    const element = (
      <UserValidationWrapper>
        <View />
      </UserValidationWrapper>
    );

    return <Route key={path} path={path} element={element} />;
  });

  appRoutesList.push(
    <Route key="*" path="*" element={<Error code={404} message="Not Found!" />} />,
  );

  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LoadingProvider>
            <ProductSelectionProvider>
              <Routes>{appRoutesList}</Routes>
            </ProductSelectionProvider>
          </LoadingProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HashRouter>
  );
}
