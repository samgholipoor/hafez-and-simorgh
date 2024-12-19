import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const productSelectionContext = createContext({
  selectedProducts: [],
  selectedProductOption: {},
  handleSelectProducts: () => {},
  handleSelectProductOption: () => {},
});

export function ProductSelectionProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductOption, setSelectedProductOption] = useState({});

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

  const handleSelectProductOption = useCallback((option) => {
    setSelectedProductOption(option);
  }, []);

  const contextProviderValue = useMemo(
    () => ({
      selectedProducts,
      selectedProductOption,
      handleSelectProducts,
      handleSelectProductOption,
    }),
    [
      selectedProducts,
      selectedProductOption,
      handleSelectProducts,
      handleSelectProductOption,
    ],
  );

  return (
    <productSelectionContext.Provider value={contextProviderValue}>
      {children}
    </productSelectionContext.Provider>
  );
}

export const useProductSelection = () => {
  const productSelection = useContext(productSelectionContext);
  if (!productSelection) {
    throw new Error('useContext doesnt use in its provider');
  }

  return productSelection;
};
