import { useCallback, useState } from 'react';
import { useApp } from '@/services/appProvider.jsx';
import EmptyFallback from '@/components/EmptyFallback';
import SuspenseFallback from '@/components/SuspenseFallback';
import ServerInfoBottomSheet from './ServerInfoBottomSheet.jsx';
import Chart from '../Chart/Chart.jsx';
import DeviceInfoBottomSheet from './DeviceInfoBottomSheet.jsx';

export default function ClusterGraph() {
  const { devices, isLoadingDevices } = useApp();

  const [selectedHost, setSelectedHost] = useState();
  const [selectedDevice, setSelectedDevice] = useState();
  const [isServerInfoBottomSheetOpen, setIsServerInfoBottomSheetOpenOpen] =
    useState(false);

  const [isDeviceInfoBottomSheetOpen, setIsDeviceInfoBottomSheetOpenOpen] =
    useState(false);

  const handleSelectHost = useCallback((host) => {
    setSelectedHost(host);
    setIsServerInfoBottomSheetOpenOpen(true);
  }, []);

  const handleSelectDevice = useCallback((deviceInfo) => {
    setSelectedDevice(deviceInfo);
    setIsDeviceInfoBottomSheetOpenOpen(true);
  }, []);

  const render = useCallback(() => {
    if (isLoadingDevices) {
      return (
        <div className="h-full flex items-center justify-center">
          <SuspenseFallback />
        </div>
      );
    }

    if (devices) {
      return (
        <Chart
          data={devices}
          handleSelectHost={handleSelectHost}
          handleSelectDevice={handleSelectDevice}
        />
      );
    }

    return <EmptyFallback />;
  }, [devices, isLoadingDevices, handleSelectHost, handleSelectDevice]);

  return (
    <div style={{ height: 'calc(100vh - 133px)' }}>
      {render()}

      {isServerInfoBottomSheetOpen ? (
        <ServerInfoBottomSheet
          host={selectedHost}
          onClose={() => setIsServerInfoBottomSheetOpenOpen(false)}
        />
      ) : null}

      {isDeviceInfoBottomSheetOpen ? (
        <DeviceInfoBottomSheet
          device={selectedDevice}
          onClose={() => setIsDeviceInfoBottomSheetOpenOpen(false)}
        />
      ) : null}
    </div>
  );
}
