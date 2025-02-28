import transformDataToHierarchyModel from '@/views/Home/utils/transformDataToHierarchyModel.js';
import axiosInstance from './service.js';

export const getGlobal = async ({ queryKey }) => {
  const params = queryKey?.[1];
  const response = await axiosInstance.get('/global', { params });
  const devices = response.data?.devices?.map((device) => {
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

  return { ...response.data, devices: [transformDataToHierarchyModel(devices)] };
};

export const getCluster = async ({ queryKey }) => {
  const id = queryKey?.[1];
  const { refresh } = queryKey?.[2] || {};

  const response = await axiosInstance.get(`/cluster/${id}/services/?refresh=${refresh}`);
  return response.data;
};

export const getServer = async (id, hardRefresh) => {
  const response = await axiosInstance.get(`/server/${id}/?refresh=${hardRefresh}`);
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
  const id = queryKey?.[1];
  const line = queryKey?.[2];
  const response = await axiosInstance.get(`/job/${id}/`, { params: { line } });
  return response.data;
};

export const updateCluster = async ({ id, body }) => {
  const response = await axiosInstance.patch(`/cluster/${id}/`, body);
  return response;
};

export const getDeviceInfo = async ({ clusterId, ip, name }, refresh) => {
  const response = await axiosInstance.get(`/cluster/${clusterId}/device/rings/`, {
    params: {
      name,
      ip,
      refresh,
    },
  });
  return response.data;
};
