import { mergeClassNames } from '@/utils/classname.js';
import Badges from './Badges.jsx';

function ServerInfo({ type, title, devices }) {
  const textColor = {
    add: 'text-primary',
    remove: 'text-error',
    weight: 'text-warning',
  };

  return (
    <div className={mergeClassNames('border-b px-6 py-3', textColor[type])}>
      <div className="text-sm">{title}</div>
      <div className="flex gap-8 font-light px-8 mt-2">
        {devices.map((device) => (
          <div key={`${device.host}-${device.name}`} className="flex gap-3">
            <span>{device.name}</span>
            <span>w: {JSON.stringify(device?.['set-weight']) || device.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServersInfoList({ devices }) {
  const transformToHierarchy = (_devices) => {
    if (!_devices) return [];

    const finalObject = {};
    _devices.forEach((device) => {
      const { host } = device;
      if (finalObject[host]) {
        finalObject[host] = [...finalObject[host], device];
      } else {
        finalObject[host] = [device];
      }
    });
    return finalObject;
  };

  const addedDevices = transformToHierarchy(devices?.['add-device']);
  const removedDevices = transformToHierarchy(devices?.['remove-device']);
  const setWeightDevices = transformToHierarchy(devices?.['set-weight']);

  return (
    <div className="flex flex-col text-sm">
      <div className="flex justify-between items-center px-6 py-2 bg-gray-100">
        <span>Devices</span>
        <Badges />
      </div>
      <div className="text-xs font-bold">
        {Object.entries(addedDevices).map(([host, _devices]) => {
          return <ServerInfo title={host} devices={_devices} type="add" />;
        })}
        {Object.entries(removedDevices).map(([host, _devices]) => {
          return <ServerInfo title={host} devices={_devices} type="remove" />;
        })}
        {Object.entries(setWeightDevices).map(([host, _devices]) => {
          return <ServerInfo title={host} devices={_devices} type="weight" />;
        })}
      </div>
    </div>
  );
}

export default ServersInfoList;
