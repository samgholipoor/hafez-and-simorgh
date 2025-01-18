import { useQuery } from 'react-query';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getCluster } from './api/index.js';

export const clusterSelectionContext = createContext({
  selectedCluster: {},
  handleSelectCluster: () => {},
});

export function ClusterSelectionProvider({ children }) {
  const [selectedCluster, setSelectedCluster] = useState({});
  const [queryParams, setQueryParams] = useState({ refresh: false, count: 1 });

  const handleSelectCluster = useCallback((option) => {
    setSelectedCluster(option);
  }, []);

  const {
    data: cluster,
    isLoading,
    refetch,
  } = useQuery(['cluster', selectedCluster.value, queryParams], getCluster, {
    enabled: !!selectedCluster.value,
  });

  useEffect(() => {
    if (selectedCluster?.value) {
      refetch();
    }
  }, [selectedCluster]);

  const onForceReload = useCallback(() => {
    setQueryParams((prev) => ({ refresh: true, count: prev.count + 1 }));
  }, []);

  const contextProviderValue = useMemo(
    () => ({
      cluster,
      isLoading,
      onForceReload,
      selectedCluster,
      handleSelectCluster,
    }),
    [cluster, isLoading, onForceReload, selectedCluster, handleSelectCluster],
  );

  return (
    <clusterSelectionContext.Provider value={contextProviderValue}>
      {children}
    </clusterSelectionContext.Provider>
  );
}

export const useClusterSelection = () => {
  const clusterSelection = useContext(clusterSelectionContext);
  if (!clusterSelection) {
    throw new Error('useContext doesnt use in its provider');
  }

  return clusterSelection;
};
