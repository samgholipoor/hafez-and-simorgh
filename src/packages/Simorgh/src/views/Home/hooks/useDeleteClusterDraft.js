import { useCallback } from 'react';
import { removeFromStorage } from '@/utils/storage.js';
import { useDeviceManagement } from '../services/deviceManagementProvider.jsx';
import { useClusterManagement } from '../services/clusterManagementProvider.jsx';

function useDeleteClusterDraft() {
  const { currentKey, clearClusterChanges } = useClusterManagement();
  const { clearDevicesChanges } = useDeviceManagement();

  const handleDeleteClusterDraft = useCallback(() => {
    clearDevicesChanges();
    clearClusterChanges();

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(currentKey)) {
        removeFromStorage(key);
      }
    });
  }, [currentKey, clearClusterChanges, clearDevicesChanges]);

  return { handleDeleteClusterDraft };
}

export { useDeleteClusterDraft };
