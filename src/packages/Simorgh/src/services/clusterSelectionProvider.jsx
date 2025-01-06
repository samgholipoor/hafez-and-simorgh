import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const clusterSelectionContext = createContext({
  selectedProducts: [],
  selectedCluster: {},
  handleSelectProducts: () => {},
  handleSelectCluster: () => {},
});

export function ClusterSelectionProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState({});

  const handleSelectProducts = useCallback(
    (selectedProduct) => {
      const sp = selectedProduct.toLowerCase();

      setSelectedProducts((prevSelectedProducts) => {
        const index = prevSelectedProducts.indexOf(sp);

        if (index > -1) {
          return [
            ...prevSelectedProducts.slice(0, index),
            ...prevSelectedProducts.slice(index + 1),
          ];
        }
        return [...prevSelectedProducts, sp];
      });
    },
    [selectedProducts],
  );

  const handleSelectCluster = useCallback((option) => {
    setSelectedCluster(option);
  }, []);

  const contextProviderValue = useMemo(
    () => ({
      selectedProducts,
      selectedCluster,
      handleSelectProducts,
      handleSelectCluster,
    }),
    [selectedProducts, selectedCluster, handleSelectProducts, handleSelectCluster],
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
