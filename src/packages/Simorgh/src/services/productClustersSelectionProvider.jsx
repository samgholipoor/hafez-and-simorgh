import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const productSelectionContext = createContext({
  selectedProductsClusters: [],
  handleSelectProductsClusters: () => {},
});

export function ProductClustersSelectionProvider({ children }) {
  const [selectedProductsClusters, setSelectedProductsClusters] = useState([]);

  const handleSelectProductsClusters = useCallback(
    (clustersId) => {
      setSelectedProductsClusters((prevClustersId) => {
        const prevClustersIdSet = new Set(prevClustersId);

        clustersId.forEach((num) => {
          if (prevClustersIdSet.has(num)) {
            prevClustersIdSet.delete(num);
          } else {
            prevClustersIdSet.add(num);
          }
        });

        return [...prevClustersIdSet];
      });
    },
    [selectedProductsClusters],
  );

  const handleSelectProductsClustersAll = useCallback(
    (clustersId, checked) => {
      setSelectedProductsClusters((prevClustersId) => {
        if (checked) {
          const prevClustersIdSet = new Set([...prevClustersId, ...clustersId]);
          return [...prevClustersIdSet];
        }

        const prevClustersIdSet = new Set(prevClustersId);
        clustersId.forEach((num) => {
          if (prevClustersIdSet.has(num)) {
            prevClustersIdSet.delete(num);
          }
        });

        return [...prevClustersIdSet];
      });
    },
    [selectedProductsClusters],
  );

  const contextProviderValue = useMemo(
    () => ({
      selectedProductsClusters,
      handleSelectProductsClusters,
      handleSelectProductsClustersAll,
    }),
    [
      selectedProductsClusters,
      handleSelectProductsClusters,
      handleSelectProductsClustersAll,
    ],
  );

  return (
    <productSelectionContext.Provider value={contextProviderValue}>
      {children}
    </productSelectionContext.Provider>
  );
}

export const useProductClustersSelection = () => {
  const productClustersSelection = useContext(productSelectionContext);
  if (!productClustersSelection) {
    throw new Error('useContext doesnt use in its provider');
  }

  return productClustersSelection;
};
