import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useIsFetching, useQuery, useQueryClient } from 'react-query';
import { getDevices, getProducts } from './api/index.js';

export const appContext = createContext({
  devices: [],
  products: [],
  isLoadingDevices: false,
  isLoadingProducts: false,
  handleHardRefreshDevices: () => {},
  handleHardRefreshProducts: () => {},
});

export function AppProvider({ children }) {
  const queryClient = useQueryClient();

  const isLoadingDevices = useIsFetching(['devices']);
  const isLoadingProducts = useIsFetching(['products']);

  const [devicesParams, setDevicesParams] = useState({ refresh: false });
  const [productsParams, setProductsParams] = useState({ refresh: false });

  const { data: devices } = useQuery(['devices', devicesParams], getDevices, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const { data: products } = useQuery(['products', productsParams], getProducts, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const handleHardRefreshDevices = useCallback(() => {
    setDevicesParams({ refresh: true });
    queryClient.invalidateQueries(['devices']);
  }, []);

  const handleHardRefreshProducts = useCallback(() => {
    setProductsParams({ refresh: true });
    queryClient.invalidateQueries(['products']);
  }, []);

  const contextProviderValue = useMemo(
    () => ({
      devices,
      products,
      isLoadingDevices,
      isLoadingProducts,
      handleHardRefreshDevices,
      handleHardRefreshProducts,
    }),
    [
      devices,
      products,
      isLoadingDevices,
      isLoadingProducts,
      handleHardRefreshDevices,
      handleHardRefreshProducts,
    ],
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
