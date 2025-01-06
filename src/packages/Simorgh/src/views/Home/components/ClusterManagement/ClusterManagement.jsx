import { useCallback } from 'react';
import { useClusterSelection } from '@/services/clusterSelectionProvider';
import { useClusterManagement } from '../../services/clusterManagementProvider.jsx';
import { useServiceSelection } from '../../services/serviceSelectionProvider.jsx';
import ClusterManagementContainer from './ClusterManagementContainer.jsx';

function ClusterManagement() {
  const { selectedCluster, handleSelectCluster } = useClusterSelection();
  const { clearClusterChanges } = useClusterManagement();
  const { closeDeviceManagementModal } = useServiceSelection();

  const handleClose = useCallback(() => {
    closeDeviceManagementModal();
    handleSelectCluster({});
    clearClusterChanges();
  }, []);

  const render = useCallback(() => {
    if (selectedCluster && (selectedCluster?.value || selectedCluster?.value === 0)) {
      return <ClusterManagementContainer onClose={handleClose} />;
    }
    return null;
  }, [selectedCluster, handleClose]);

  return (
    <div className="fixed right-6 flex flex-col gap-2 w-96" style={{ top: '110px' }}>
      {render()}
    </div>
  );
}

export default ClusterManagement;
