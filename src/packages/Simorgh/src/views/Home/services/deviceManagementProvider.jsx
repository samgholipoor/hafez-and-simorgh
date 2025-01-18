import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getFromStorage, saveToStorage } from '@/utils/storage.js';

const getKey = (clusterName, serviceName) => {
  return `${clusterName}-${serviceName}`;
};

export const deviceManagementContext = createContext({
  currentServiceDevices: {},
  addNewDevices: () => {},
  removeDevices: () => {},
  setWeightDevices: () => {},
  revertRemoveDevice: () => {},
  setClusterServiceKey: () => {},
});

export function DeviceManagementProvider({ children }) {
  const [currentServiceDevices, setCurrentServiceDevices] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);

  const updateStorage = useCallback(
    (newDevices) => {
      saveToStorage(currentKey, newDevices);
    },
    [currentKey],
  );

  const handleUpdateCurrentServiceDevices = useCallback(
    (newDevices) => {
      setCurrentServiceDevices(newDevices);
      updateStorage(newDevices);
    },
    [updateStorage],
  );

  const getDevicesFromStorage = useCallback((key) => {
    const serviceDevices = getFromStorage(key);
    if (serviceDevices) {
      return serviceDevices;
    }
    return null;
  }, []);

  const updateStateWithNewKey = useCallback((key) => {
    const storedDevices = getDevicesFromStorage(key);
    setCurrentServiceDevices(storedDevices);
  }, []);

  const setClusterServiceKey = useCallback(
    (clusterName, serviceName) => {
      if (clusterName === null) {
        setCurrentKey(null);
        setCurrentServiceDevices(null);
      }

      const key = getKey(clusterName, serviceName);

      if (currentKey !== key) {
        setCurrentKey(key);
        updateStateWithNewKey(key);
      }
    },
    [currentKey],
  );

  const addNewDevices = useCallback(
    (newDevices) => {
      const storedDevices = { ...currentServiceDevices } || {};
      storedDevices['add-device'] = newDevices.map((device) => ({
        ...device,
        'set-weight': 100,
      }));
      handleUpdateCurrentServiceDevices(storedDevices);
    },
    [currentServiceDevices, handleUpdateCurrentServiceDevices],
  );

  const removeDevices = useCallback(
    (removedDevices) => {
      const storedDevices = { ...currentServiceDevices } || {};
      const addedDevices = storedDevices['add-device'] || [];
      const weightedDevices = storedDevices['set-weight'] || [];

      const newAddedDevices = addedDevices.filter((addedDevice) => {
        for (let i = 0; i < removedDevices.length; i++) {
          const removedDevice = removedDevices[i];

          if (
            addedDevice.host === removedDevice.host &&
            addedDevice.name === removedDevice.name
          ) {
            return false;
          }
        }
        return true;
      });

      const restRemovedDevice = removedDevices.filter((removedDevice) => {
        if (removedDevice?.['add-device'] === true) {
          return false;
        }
        return true;
      });

      storedDevices['add-device'] = newAddedDevices;
      if (restRemovedDevice?.length > 0) {
        storedDevices['remove-device'] = restRemovedDevice;
      }

      storedDevices['set-weight'] = weightedDevices.filter((device) => {
        for (let i = 0; i < removedDevices.length; i++) {
          const removedDevice = removedDevices[i];
          if (removedDevice.host === device.host && removedDevice.name === device.name) {
            return false;
          }
        }
        return true;
      });

      handleUpdateCurrentServiceDevices(storedDevices);
    },
    [
      getDevicesFromStorage,
      handleUpdateCurrentServiceDevices,
      currentServiceDevices,
      currentKey,
    ],
  );

  const revertRemoveDevice = useCallback(
    (device) => {
      const storedDevices = { ...currentServiceDevices } || {};
      const removedDevices = storedDevices['remove-device'];
      const newRemovedDevices = removedDevices?.filter((removedDevice) => {
        if (removedDevice.host === device.host && removedDevice.name === device.name) {
          return false;
        }
        return true;
      });

      storedDevices['remove-device'] = newRemovedDevices;
      handleUpdateCurrentServiceDevices(storedDevices);
    },
    [currentServiceDevices],
  );

  const setWeightDevices = useCallback(
    (device, newWeight) => {
      const serviceDevices = { ...currentServiceDevices } || {};
      const setWieghtDevices = [...(serviceDevices['set-weight'] || [])];
      const addedDevices = serviceDevices['add-device'] || [];

      const addedDeviceIndex = addedDevices.findIndex((setWieghtDevice) => {
        if (
          setWieghtDevice.host === device.host &&
          setWieghtDevice.name === device.name
        ) {
          return true;
        }
      });

      if (addedDeviceIndex !== -1) {
        serviceDevices['add-device'] = [
          ...addedDevices.slice(0, addedDeviceIndex),
          {
            ...serviceDevices['add-device'][addedDeviceIndex],
            'set-weight': newWeight,
          },
          ...addedDevices.slice(addedDeviceIndex + 1),
        ];

        handleUpdateCurrentServiceDevices(serviceDevices);
        return;
      }

      const index = setWieghtDevices.findIndex((setWieghtDevice) => {
        if (
          setWieghtDevice.host === device.host &&
          setWieghtDevice.name === device.name
        ) {
          return true;
        }
      });

      if (index === -1) {
        setWieghtDevices.push({
          ...device,
          'set-weight': newWeight,
        });
      } else {
        const setWieghtDevice = setWieghtDevices[index];
        if (setWieghtDevice.weight === newWeight) {
          setWieghtDevices.splice(index, 1);
        } else {
          setWieghtDevice['set-weight'] = newWeight;
        }
      }

      serviceDevices['set-weight'] = setWieghtDevices;

      handleUpdateCurrentServiceDevices(serviceDevices);
    },
    [currentServiceDevices, handleUpdateCurrentServiceDevices],
  );

  const clearDevicesChanges = useCallback(() => {
    setCurrentServiceDevices({});
  }, [currentKey]);

  const contextProviderValue = useMemo(
    () => ({
      addNewDevices,
      removeDevices,
      setWeightDevices,
      revertRemoveDevice,
      currentServiceDevices,
      setClusterServiceKey,
      clearDevicesChanges,
    }),
    [
      addNewDevices,
      removeDevices,
      setWeightDevices,
      revertRemoveDevice,
      currentServiceDevices,
      setClusterServiceKey,
      clearDevicesChanges,
    ],
  );

  return (
    <deviceManagementContext.Provider value={contextProviderValue}>
      {children}
    </deviceManagementContext.Provider>
  );
}

export const useDeviceManagement = () => {
  const deviceManagement = useContext(deviceManagementContext);
  if (!deviceManagement) {
    throw new Error('useContext doesnt use in its provider');
  }

  return deviceManagement;
};
