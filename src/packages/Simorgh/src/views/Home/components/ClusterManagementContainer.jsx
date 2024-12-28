import { useCallback } from 'react';
import { useProductSelection } from '@/services/productSelectionProvider';
import ClusterManagement from './ClusterManagement/ClusterManagement';

const ClusterManagementContainer = () => {
  const { selectedProductOption, handleSelectProductOption } = useProductSelection();

  const render = useCallback(() => {
    if (
      selectedProductOption &&
      (selectedProductOption?.value || selectedProductOption?.value === 0)
    ) {
      return (
        <ClusterManagement
          onClose={() => {
            handleSelectProductOption({});
          }}
        />
      );
    }

    return null;
  }, [selectedProductOption]);

  return render();
};

export default ClusterManagementContainer;
