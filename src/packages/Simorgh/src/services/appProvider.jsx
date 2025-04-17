import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useIsFetching, useQuery, useQueryClient } from 'react-query';
import { getGlobal } from './api/index.js';

export const appContext = createContext({
  devices: [],
  products: [],
  deviceErrorsText: [],
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

  const productsClustersErrors = useMemo(() => {
    return products.map((product) => {
      return product.clusters.map((cluster) => {
        return {
          clusterId: cluster.id,
          errors: cluster.errors,
        };
      });
    });
  }, [products]);

  const devicesErrors = useMemo(() => {
    return productsClustersErrors
      .map((productsClustersError) =>
        productsClustersError.map((clusterError) => clusterError.errors).flat(),
      )
      .flat();
  }, [productsClustersErrors]);

  const deviceErrorsText = useMemo(() => {
    return devicesErrors.map((deviceError) => {
      return {
        host: deviceError.host,
        text: deviceError.lines.join(', '),
      };
    });
  }, [devicesErrors]);

  const contextProviderValue = useMemo(
    () => ({
      devices,
      products,
      deviceErrorsText,
      isLoading,
      handleHardRefresh,
    }),
    [devices, products, deviceErrorsText, isLoading, handleHardRefresh],
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
