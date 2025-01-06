import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getFromStorage, saveToStorage } from '@/utils/storage.js';
import { useClusterSelection } from '@/services/clusterSelectionProvider.jsx';

export const clusterManagementContext = createContext({
  currentKey: {},
  clusterMetadata: {},
  setServiceMetaData: () => {},
  clearClusterChanges: () => {},
  isPreviewChangesModalOpen: false,
  openPreviewChangesModal: () => {},
  closePreviewChangesModal: () => {},
});

export function ClusterManagementProvider({ children }) {
  const { selectedCluster } = useClusterSelection();

  const [clusterMetadata, setClusterMetadata] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [isPreviewChangesModalOpen, setIsPreviewChangesModalOpen] = useState(false);

  const openPreviewChangesModal = useCallback(() => {
    setIsPreviewChangesModalOpen(true);
  }, []);

  const closePreviewChangesModal = useCallback(() => {
    setIsPreviewChangesModalOpen(false);
  }, []);

  const updateStorage = useCallback(
    (newMetadata) => {
      saveToStorage(currentKey, newMetadata);
    },
    [currentKey],
  );

  const handleUpdateClusterMetadata = useCallback(
    (newMetadata) => {
      setClusterMetadata(newMetadata);
      updateStorage(newMetadata);
    },
    [updateStorage],
  );

  const getClusterMetadataFromStorage = useCallback((key) => {
    const serviceDevices = getFromStorage(key);
    if (serviceDevices) {
      return serviceDevices;
    }
    return null;
  }, []);

  const updateStateWithKey = useCallback((key) => {
    const storedDevices = getClusterMetadataFromStorage(key);
    if (storedDevices) {
      setClusterMetadata(storedDevices);
    }
  }, []);

  useEffect(() => {
    const selectedClusterName = selectedCluster?.label;
    if (selectedClusterName) {
      setCurrentKey(selectedClusterName);
      updateStateWithKey(selectedClusterName);
    } else {
      setCurrentKey(null);
      setClusterMetadata(null);
    }
  }, [selectedCluster?.label]);

  const setServiceMetaData = useCallback(
    (newValue, service) => {
      const metadata = { ...clusterMetadata } || {};
      const currentService = metadata[service.name] || {};

      const isPreviousValue = Object.entries(newValue).every(([key, value]) => {
        return service[key] === Number(value);
      });

      if (isPreviousValue) {
        const [key] = Object.keys(newValue);
        delete currentService[`draft_${key}`];

        handleUpdateClusterMetadata({
          ...metadata,
          [service.name]: currentService,
        });
        return;
      }

      const newObj = {
        ...currentService,
        ...Object.fromEntries(
          Object.entries(newValue).map(([key, value]) => [`draft_${key}`, value]),
        ),
      };
      handleUpdateClusterMetadata({
        ...metadata,
        [service.name]: newObj,
      });
    },
    [currentKey, clusterMetadata, handleUpdateClusterMetadata],
  );

  const clearClusterChanges = useCallback(() => {
    setClusterMetadata({});
  }, []);

  const contextProviderValue = useMemo(
    () => ({
      currentKey,
      clusterMetadata,
      setServiceMetaData,
      clearClusterChanges,
      isPreviewChangesModalOpen,
      openPreviewChangesModal,
      closePreviewChangesModal,
    }),
    [
      currentKey,
      clusterMetadata,
      setServiceMetaData,
      clearClusterChanges,
      isPreviewChangesModalOpen,
      openPreviewChangesModal,
      closePreviewChangesModal,
    ],
  );

  return (
    <clusterManagementContext.Provider value={contextProviderValue}>
      {children}
    </clusterManagementContext.Provider>
  );
}

export const useClusterManagement = () => {
  const deviceManagement = useContext(clusterManagementContext);
  if (!deviceManagement) {
    throw new Error('useContext doesnt use in its provider');
  }

  return deviceManagement;
};
