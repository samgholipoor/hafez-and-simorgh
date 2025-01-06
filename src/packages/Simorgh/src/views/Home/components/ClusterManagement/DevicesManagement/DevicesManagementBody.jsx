import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import SuspenseFallback from '@/components/SuspenseFallback.jsx';
import EmptyFallback from '@/components/EmptyFallback.jsx';
import { getServiceDevices } from '@/services/api/index.js';
import { useClusterSelection } from '@/services/clusterSelectionProvider';
import { useServiceSelection } from '@/views/Home/services/serviceSelectionProvider.jsx';
import AddDevicesForm from './AddDevicesForm.jsx';
import CurrentDevicesForm from './CurrentDevicesForm.jsx';

function DevicesManagementBody({ onFinish }) {
  const { selectedCluster } = useClusterSelection();
  const { selectedService } = useServiceSelection();

  const [isAddState, setIsAddState] = useState(false);

  const { data: devices, isLoading } = useQuery(
    ['service-devices', selectedCluster?.value, selectedService.name],
    getServiceDevices,
  );

  const render = useCallback(() => {
    if (isLoading) {
      return (
        <div className="h-full flex justify-center items-center p-4">
          <SuspenseFallback />
        </div>
      );
    }

    if (devices || Object.keys(devices).length >= 0) {
      return isAddState ? (
        <AddDevicesForm
          isAddState={isAddState}
          devices={devices}
          onClose={() => {
            setIsAddState(false);
          }}
          onFinish={() => {
            setIsAddState(false);
          }}
        />
      ) : (
        <CurrentDevicesForm
          devices={devices}
          onFinish={onFinish}
          onAddNewDeviceClick={() => {
            setIsAddState(true);
          }}
        />
      );
    }

    return (
      <div className="h-full flex justify-center items-center p-4">
        <EmptyFallback message="Something went wrong!" />
      </div>
    );
  }, [isLoading, devices, isAddState]);

  return (
    <div
      className="h-full bg-white shadow-lg px-6 flex flex-col gap-8 rounded-b-lg overflow-auto"
      style={{ height: 'calc(100vh - 226px)' }}
    >
      {render()}
    </div>
  );
}

export default DevicesManagementBody;
