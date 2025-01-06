import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export const serviceSelectionContext = createContext({
  selectedService: null,
  isDeviceManagementModalOpen: false,
  closeDeviceManagementModal: () => {},
  openDeviceManagementModal: () => {},
});

export function ServiceSelectionProvider({ children }) {
  const [selectedService, setSelectedService] = useState(null);
  const [isDeviceManagementModalOpen, setIsDeviceManagementModalOpen] = useState(false);

  const closeDeviceManagementModal = useCallback(() => {
    setSelectedService(null);
    setIsDeviceManagementModalOpen(false);
  }, []);

  const openDeviceManagementModal = useCallback((newService) => {
    setSelectedService(newService);
    setIsDeviceManagementModalOpen(true);
  }, []);

  const contextProviderValue = useMemo(
    () => ({
      selectedService,
      isDeviceManagementModalOpen,
      closeDeviceManagementModal,
      openDeviceManagementModal,
    }),
    [
      selectedService,
      isDeviceManagementModalOpen,
      closeDeviceManagementModal,
      openDeviceManagementModal,
    ],
  );

  return (
    <serviceSelectionContext.Provider value={contextProviderValue}>
      {children}
    </serviceSelectionContext.Provider>
  );
}

export const useServiceSelection = () => {
  const serviceSelection = useContext(serviceSelectionContext);
  if (!serviceSelection) {
    throw new Error('useContext doesnt use in its provider');
  }

  return serviceSelection;
};
