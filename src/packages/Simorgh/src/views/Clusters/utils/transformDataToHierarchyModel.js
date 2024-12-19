import { REGION, ZONE, NAME, IP, CLUSTER_LEVEL_NAME } from '../constant/index.js';

const generateLabel = (level, device) => {
  switch (level) {
    case 'region':
      return `Region ${device.region}`;
    case 'zone':
      return `Zone ${device.zone}`;
    case 'ip':
      return device.ip;
    case 'name':
      return device.name;
    default:
      return '';
  }
};

function nestDevices(devices) {
  const nestedData = {
    value: 0,
    children: [],
  };

  devices.forEach((device) => {
    let currentLevel = nestedData.children;
    const levels = [REGION, ZONE, IP, NAME];

    levels.forEach((level) => {
      const key = device[level];
      let child = currentLevel.find((item) => item.key === key);

      if (!child) {
        child = {
          key,
          name: generateLabel(level, device),
          level: CLUSTER_LEVEL_NAME[level],
          products: device.association?.map((a) => a.product?.toLowerCase()),
          host: device.host,
          children: [],
        };
        currentLevel.push(child);
      } else {
        child.products = [
          ...new Set([...child.products, ...device.association?.map((a) => a.product)]),
        ];
      }

      currentLevel = child.children;
    });
  });

  return nestedData;
}

const transformDataToHierarchyModel = nestDevices;

export { transformDataToHierarchyModel };
