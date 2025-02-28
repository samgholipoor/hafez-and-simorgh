import { getUniqueObjectsByValue } from '@/utils/object.js';
import { REGION, ZONE, NAME, HOST, CLUSTER_LEVEL_NAME } from '../constant';

const generateLabel = (level, device) => {
  switch (level) {
    case 'region':
      return `Region ${device.region}`;
    case 'zone':
      return `Zone ${device.zone}`;
    case 'host':
      return device.host;
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
    const levels = [REGION, ZONE, HOST, NAME];

    levels.forEach((level) => {
      const key = device[level];
      let child = currentLevel.find((item) => item.key === key);

      if (!child) {
        child = {
          key,
          name: generateLabel(level, device),
          level: CLUSTER_LEVEL_NAME[level],
          products: device.association?.map((a) => a.product?.toLowerCase()),
          clustersId: device.association?.map((a) => a.cluster_id),
          clustersName: device.association?.map((a) => a.cluster),
          clusters: device.association?.map((a) => ({
            cluster: a.cluster,
            cluster_id: a.cluster_id,
          })),
          host: device.host,
          ip: device.ip,
          children: [],
        };
        currentLevel.push(child);
      } else {
        child.products = [
          ...new Set([
            ...child.products,
            ...device.association?.map((a) => a.product?.toLowerCase()),
          ]),
        ];
        child.clustersId = [
          ...new Set([
            ...child.clustersId,
            ...device.association?.map((a) => a.cluster_id),
          ]),
        ];
        child.clustersName = [
          ...new Set([
            ...child.clustersName,
            ...device.association?.map((a) => a.cluster),
          ]),
        ];
        child.clusters = [
          ...child.clusters,
          ...device?.association?.map((a) => ({
            cluster: a?.cluster,
            cluster_id: a?.cluster_id,
          })),
        ];
        child.clusters = getUniqueObjectsByValue(child.clusters);
      }

      currentLevel = child.children;
    });
  });

  return nestedData;
}

const transformDataToHierarchyModel = nestDevices;

export default transformDataToHierarchyModel;
