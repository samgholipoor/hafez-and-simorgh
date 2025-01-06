function makeServerDevices(devices) {
  const servers = {};

  devices.forEach((device) => {
    const { host } = device;
    const deviceInfo = {
      id: device.id,
      host,
      name: device.name,
      weight: device.weight,
      included: device.included,
      zone: device.zone,
      region: device.region,
      ip: device.ip,
      ...(device.checked ? { checked: device.checked } : null),
      ...(device['add-device'] ? { 'add-device': device['add-device'] } : null),
      ...(device['remove-device'] ? { 'remove-device': device['remove-device'] } : null),
      ...(device['set-weight'] || device['set-weight'] === 0
        ? { 'set-weight': device['set-weight'] }
        : null),
    };

    if (servers.hasOwnProperty(host)) {
      servers[host] = [...servers[host], deviceInfo];
    } else {
      servers[host] = [deviceInfo];
    }
  });

  return servers;
}

export default makeServerDevices;
