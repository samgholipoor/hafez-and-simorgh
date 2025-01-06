import { useCallback, useEffect } from 'react';
import { useClusterSelection } from '@/services/clusterSelectionProvider';
import { useServiceSelection } from '@/views/Home/services/serviceSelectionProvider.jsx';
import DevicesManagementHeader from './DevicesManagementHeader.jsx';
import DevicesManagementBody from './DevicesManagementBody.jsx';
import { useDeviceManagement } from '../../../services/deviceManagementProvider.jsx';

function DevicesManagement() {
  const { setClusterServiceKey } = useDeviceManagement();
  const { selectedCluster } = useClusterSelection();
  const { selectedService, closeDeviceManagementModal } = useServiceSelection();

  useEffect(() => {
    if (selectedCluster?.label && selectedService?.name) {
      setClusterServiceKey(selectedCluster.label, selectedService.name);
    }
  }, [selectedCluster, selectedService]);

  const handleClose = useCallback(() => {
    closeDeviceManagementModal();
    setClusterServiceKey(null);
  }, [closeDeviceManagementModal, setClusterServiceKey]);

  const render = useCallback(() => {
    return (
      <div className="fixed" style={{ right: '432px', top: '110px' }}>
        <div className="flex flex-col gap-2" style={{ width: '600px' }}>
          <DevicesManagementHeader onClose={handleClose} />
          <DevicesManagementBody onFinish={handleClose} />
        </div>
      </div>
    );
  }, [handleClose]);

  return render();
}

export default DevicesManagement;
