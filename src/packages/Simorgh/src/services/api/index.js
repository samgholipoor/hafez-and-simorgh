import transformDataToHierarchyModel from '@/views/Home/utils/transformDataToHierarchyModel.js';
import axiosInstance from './service.js';

export const getProducts = async ({ queryKey }) => {
  const [_, params] = queryKey;
  const response = await axiosInstance.get('/products', { params });
  return response.data;
};

export const getDevices = async ({ queryKey }) => {
  const [_, params] = queryKey;
  const response = await axiosInstance.get('/devices', { params });
  const readyData = response.data?.devices?.map((device) => {
    if (!device.ip) {
      return {
        ...device,
        region: 0,
        zone: 0,
        ip: '0.0.0.0',
        association: [{ product: 'others' }],
      };
    }
    return device;
  });

  return [transformDataToHierarchyModel(readyData)];
};

export const getCluster = async ({ queryKey }) => {
  const [_, id, { refresh }] = queryKey;
  const response = await axiosInstance.get(`/cluster/${id}/services/?refresh=${refresh}`);
  return response.data;
};

export const getServer = async (id) => {
  const response = await axiosInstance.get(`/server/${id}/`);
  return response.data;
};

export const getServiceDevices = async ({ queryKey }) => {
  const [, clusterId, serviceId] = queryKey;
  const response = await axiosInstance.get(
    `/cluster/${clusterId}/service/${serviceId}/devices/`,
  );
  const { devices } = response.data || {};
  return devices;
};

export const submitCommands = async ({ id, data }) => {
  const response = await axiosInstance.post(`/cluster/${id}/commands/submit/`, data);
  return response.data;
};

export const getJob = async ({ queryKey }) => {
  const [_, id, line] = queryKey;
  const response = await axiosInstance.get(`/job/${id}/`, { params: { line } });
  return response.data;
};

export const updateCluster = async ({ id, body }) => {
  const response = await axiosInstance.patch(`/cluster/${id}/`, body);
  return response;
};
