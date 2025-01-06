import { useMemo } from 'react';
import { getFromStorage } from '@/utils/storage.js';
import { useClusterManagement } from '../services/clusterManagementProvider.jsx';
import { useDeviceManagement } from '../services/deviceManagementProvider.jsx';

function useGetSubmitingCommands() {
  const { currentKey, clusterMetadata } = useClusterManagement();
  const { currentServiceDevices } = useDeviceManagement();

  function getDeviceBasedOnCommand(type, device) {
    const actions = {
      'add-device': (d) => ({
        name: d.name,
        zone: d.zone,
        region: d.region,
        ip: d.ip,
        weight: d['set-weight'],
      }),
      'remove-device': (d) => ({
        id: d.id,
      }),
      'set-weight': (d) => ({
        id: d.id,
        weight: d['set-weight'],
      }),
    };

    return actions[type](device);
  }

  const devicesCommand = useMemo(() => {
    const devices = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(currentKey) && currentKey !== key) {
        const serviceName = key.split('-')[1];
        const service = getFromStorage(key);
        Object.entries(service).forEach(([commandName, commands]) => {
          commands.forEach((command) => {
            devices.push({
              service: serviceName,
              command: commandName,
              params: {
                device: getDeviceBasedOnCommand(commandName, command),
              },
            });
          });
        });
      }
    }

    return devices;
  }, [currentKey, currentServiceDevices]);

  const ringsCommand = useMemo(() => {
    const services = getFromStorage(currentKey);
    if (!services) return [];

    const commandNames = {
      draft_replication: 'set-replication',
      draft_min_part_hours: 'set-min-part-hours',
    };

    const rings = [];
    Object.entries(services).forEach(([key, commands]) => {
      const [serviceName] = key.split('-');
      Object.entries(commands).forEach((command) => {
        const [commandName, value] = command;

        rings.push({
          service: serviceName,
          command: commandNames[commandName],
          params: {
            value,
          },
        });
      });
    });

    return rings;
  }, [currentKey, clusterMetadata]);

  return useMemo(() => {
    return {
      devices: devicesCommand,
      rings: ringsCommand,
    };
  }, [devicesCommand, ringsCommand]);
}

export { useGetSubmitingCommands };
