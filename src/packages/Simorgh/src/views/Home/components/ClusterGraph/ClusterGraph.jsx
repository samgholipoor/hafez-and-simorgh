import {useCallback, useMemo, useState} from 'react';
import {useApp} from '@/services/appProvider.jsx';
import EmptyFallback from '@/components/EmptyFallback';
import {IS_PROD} from '@/constants/index.js';
import ContextMenu from '@/components/ContextMenu.jsx';
import SuspenseFallback from '@/components/SuspenseFallback';
import ServerInfoBottomSheet from './ServerInfoBottomSheet.jsx';
import Chart from '../Chart/Chart.jsx';
import DeviceInfoBottomSheet from './DeviceInfoBottomSheet.jsx';

export default function ClusterGraph() {
  const {devices, isLoading} = useApp();

  const [selectedHost, setSelectedHost] = useState();
  const [selectedDevice, setSelectedDevice] = useState();
  const [isServerInfoBottomSheetOpen, setIsServerInfoBottomSheetOpenOpen] =
    useState(false);

  const [isDeviceInfoBottomSheetOpen, setIsDeviceInfoBottomSheetOpenOpen] =
    useState(false);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const handleSelectHost = useCallback((host) => {
    setSelectedHost(host);
    setIsServerInfoBottomSheetOpenOpen(true);
  }, []);

  const handleSelectDevice = useCallback((deviceInfo) => {
    setSelectedDevice(deviceInfo);
    setIsDeviceInfoBottomSheetOpenOpen(true);
  }, []);

  const [selectedClusters, setSelectedClusters] = useState([]);
  const [clientCoordination, setClientCoordination] = useState({x: 0, y: 0});
  const handleRightClick = useCallback((event, context) => {
    setIsContextMenuOpen(true);
    setClientCoordination({
      x: event.clientX + 2,
      y: IS_PROD ? event.clientY - 34 : event.clientY,
    });
    setSelectedClusters(
      context.clusters.map((cluster) => ({
        title: cluster.cluster,
        value: cluster.cluster_id,
      })),
    );
  }, []);

  const handleContextMenuItemClick = (item) => {
    console.log(item);
  };

  const menuItems = useMemo(() => {
    return [
      {
        icon: 'settings',
        title: 'settings',
        value: 'settings',
        children: selectedClusters,
      },
    ];
  }, [selectedClusters]);

  const render = useCallback(() => {
    if (isLoading) {
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
          handleRightClick={handleRightClick}
        />
      );
    }

    return <EmptyFallback />;
  }, [
    devices,
    isLoading,
    handleSelectHost,
    handleSelectDevice,
    handleRightClick,
  ]);

  return (
    <div style={{height: 'calc(100vh - 133px)'}}>
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

      {isContextMenuOpen ? (
        <ContextMenu
          items={menuItems}
          className="fixed"
          style={{left: clientCoordination.x, top: clientCoordination.y}}
          handleClick={handleContextMenuItemClick}
          onClose={() => setIsContextMenuOpen(false)}
        />
      ) : null}
    </div>
  );
}
