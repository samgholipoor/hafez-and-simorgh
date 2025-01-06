import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getFromStorage, removeFromStorage, saveToStorage } from '@/utils/storage.js';
import { useClusterManagement } from './clusterManagementProvider.jsx';

export const jobIDContext = createContext({
  commandsJobId: {},
  rebalanceJobId: {},
  handleSetCommandsJobId: () => {},
  handleSetRebalanceJobId: () => {},
  isCommandsJobModalOpen: {},
  isRebalanceJobModalOpen: {},
  openCommandsJobModal: () => {},
  closeCommandsJobModal: () => {},
  openRebalanceJobModal: () => {},
  closeRebalanceJobModal: () => {},
});

export function JobIDProvider({ children }) {
  const { currentKey } = useClusterManagement();
  const [commandsJobId, setCommandsJobId] = useState(null);
  const [rebalanceJobId, setRebalanceJobId] = useState(null);
  const [isCommandsJobModalOpen, setIsCommandsJobModalOpen] = useState(false);
  const [isRebalanceJobModalOpen, setIsRebalanceJobModalOpen] = useState(false);

  const openCommandsJobModal = useCallback(() => {
    setIsCommandsJobModalOpen(true);
  }, []);

  const closeCommandsJobModal = useCallback(() => {
    setIsCommandsJobModalOpen(false);
  }, []);

  const openRebalanceJobModal = useCallback(() => {
    setIsRebalanceJobModalOpen(true);
  }, []);

  const closeRebalanceJobModal = useCallback(() => {
    setIsRebalanceJobModalOpen(false);
  }, []);

  useEffect(() => {
    if (currentKey) {
      const commandsKey = `${currentKey}-commands-jobId`;
      const rebalanceKey = `${currentKey}-rebalance-jobId`;
      setCommandsJobId(getFromStorage(commandsKey));
      setRebalanceJobId(getFromStorage(rebalanceKey));
    }
  }, [currentKey]);

  const handleSetCommandsJobId = useCallback(
    (jobId) => {
      const newKey = `${currentKey}-commands-jobId`;
      if (jobId === null) {
        setCommandsJobId(null);
        removeFromStorage(newKey);
        return;
      }
      setCommandsJobId(jobId);
      saveToStorage(newKey, jobId);
    },
    [currentKey],
  );

  const handleSetRebalanceJobId = useCallback(
    (jobId) => {
      const newKey = `${currentKey}-rebalance-jobId`;
      if (jobId === null) {
        setRebalanceJobId(null);
        removeFromStorage(newKey);
        return;
      }
      setRebalanceJobId(jobId);
      saveToStorage(newKey, jobId);
    },
    [currentKey],
  );

  const contextProviderValue = useMemo(
    () => ({
      commandsJobId,
      rebalanceJobId,
      isCommandsJobModalOpen,
      isRebalanceJobModalOpen,
      handleSetCommandsJobId,
      handleSetRebalanceJobId,
      openCommandsJobModal,
      closeCommandsJobModal,
      openRebalanceJobModal,
      closeRebalanceJobModal,
    }),
    [
      commandsJobId,
      rebalanceJobId,
      isCommandsJobModalOpen,
      isRebalanceJobModalOpen,
      handleSetCommandsJobId,
      handleSetRebalanceJobId,
      openCommandsJobModal,
      closeCommandsJobModal,
      openRebalanceJobModal,
      closeRebalanceJobModal,
    ],
  );

  return (
    <jobIDContext.Provider value={contextProviderValue}>{children}</jobIDContext.Provider>
  );
}

export const useJobID = () => {
  const jobID = useContext(jobIDContext);
  if (!jobID) {
    throw new Error('useContext doesnt use in its provider');
  }

  return jobID;
};
