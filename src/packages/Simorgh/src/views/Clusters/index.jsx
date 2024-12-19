import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { getDevices } from '@/services/api';
import InApp from '@/layouts/InApp';
import EmptyFallback from '@/components/EmptyFallback';
import SuspenseFallback from '@/components/SuspenseFallback';
import Chart from './components/Chart.jsx';
import ClusterManagementContainer from './components/ClusterManagementContainer.jsx';
import ServerInfoBottomSheet from './components/ServerInfoBottomSheet/ServerInfoBottomSheet.jsx';
// import { devices } from './rawdata.js';

export default function Clusters() {
  const { data: devices, isLoading } = useQuery('devices', getDevices);
  const [selectedHost, setSelectedHost] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectHost = useCallback((host) => {
    setIsOpen(true);
    setSelectedHost(host);
  }, []);

  const render = useCallback(() => {
    if (isLoading) {
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
  }, [devices, isLoading, handleSelectHost]);

  return (
    <InApp>
      <div style={{ height: 'calc(100vh - 72px)' }}>{render()}</div>
      <ClusterManagementContainer />
      {isOpen ? (
        <ServerInfoBottomSheet host={selectedHost} onClose={() => setIsOpen(false)} />
      ) : null}
    </InApp>
  );
}

Clusters.routerConfig = {
  path: '/clusters',
};
