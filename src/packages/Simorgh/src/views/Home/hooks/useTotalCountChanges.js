import { useMemo } from 'react';
import { getFromStorage } from '@/utils/storage.js';
import { useClusterManagement } from '../services/clusterManagementProvider.jsx';
import { useDeviceManagement } from '../services/deviceManagementProvider.jsx';

function useTotalCountChanges() {
  const { currentKey, clusterMetadata } = useClusterManagement();
  const { currentServiceDevices } = useDeviceManagement();

  const deviceModifiedCount = useMemo(() => {
    let totalChanges = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(currentKey) && currentKey !== key) {
        const changes = getFromStorage(key);

        totalChanges += Object.values(changes).flat()?.length || 0;
      }
    }

    return totalChanges;
  }, [currentKey, currentServiceDevices]);

  const clusterModifiedCount = useMemo(() => {
    let totalChanges = 0;
    if (!clusterMetadata) return totalChanges;

    Object.values(clusterMetadata)?.forEach((metadata) => {
      totalChanges += Object.keys(metadata).length;
    });
    return totalChanges;
  }, [clusterMetadata]);

  return useMemo(() => {
    return clusterModifiedCount + deviceModifiedCount;
  }, [clusterModifiedCount, deviceModifiedCount]);
}

export { useTotalCountChanges };
