import { useCallback, useState } from 'react';
import { useApp } from '@/services/appProvider.jsx';
import EmptyFallback from '@/components/EmptyFallback';
import SuspenseFallback from '@/components/SuspenseFallback';
import ServerInfoBottomSheet from './ServerInfoBottomSheet.jsx';
import Chart from '../Chart/Chart.jsx';

export default function ClusterGraph() {
  const { devices, isLoadingDevices } = useApp();

  const [selectedHost, setSelectedHost] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectHost = useCallback((host) => {
    setIsOpen(true);
    setSelectedHost(host);
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
      return <Chart data={devices} handleSelectHost={handleSelectHost} />;
    }

    return <EmptyFallback />;
  }, [devices, isLoadingDevices, handleSelectHost]);

  return (
    <div style={{ height: 'calc(100vh - 133px)' }}>
      {render()}
      {isOpen ? (
        <ServerInfoBottomSheet host={selectedHost} onClose={() => setIsOpen(false)} />
      ) : null}
    </div>
  );
}
