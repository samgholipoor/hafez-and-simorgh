import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useIsFetching, useQuery, useQueryClient } from 'react-query';
import { getGlobal } from './api/index.js';

export const appContext = createContext({
  devices: [],
  products: [],
  isLoading: false,
  handleHardRefresh: () => {},
});

export function AppProvider({ children }) {
  const queryClient = useQueryClient();

  const isLoading = useIsFetching(['global']);

  const [globalParams, setGlobalParams] = useState({ refresh: false });

  const { data: global } = useQuery(['global', globalParams], getGlobal, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const devices = useMemo(() => global?.devices || [], [global]);
  const products = useMemo(() => global?.products || [], [global]);

  const handleHardRefresh = useCallback(() => {
    setGlobalParams({ refresh: true });
    queryClient.invalidateQueries(['global']);
  }, []);

  const contextProviderValue = useMemo(
    () => ({
      devices,
      products,
      isLoading,
      handleHardRefresh,
    }),
    [devices, products, isLoading, handleHardRefresh],
  );

  return (
    <appContext.Provider value={contextProviderValue}>{children}</appContext.Provider>
  );
}

export const useApp = () => {
  const app = useContext(appContext);
  if (!app) {
    throw new Error('useContext doesnt use in its provider');
  }

  return app;
};
