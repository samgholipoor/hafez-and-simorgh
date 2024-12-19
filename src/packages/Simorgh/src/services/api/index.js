import { transformDataToHierarchyModel } from '@/views/Clusters/utils/transformDataToHierarchyModel.js';
import axiosInstance from './service.js';

export const getProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const getDevices = async () => {
  const response = await axiosInstance.get('/devices');
  return [transformDataToHierarchyModel(response.data?.devices || [])];
};

export const getCluster = async ({ queryKey }) => {
  const [, id] = queryKey;
  const response = await axiosInstance.get(`/cluster/${id}/services/`);
  return response.data;
};

export const getServer = async (id) => {
  const response = await axiosInstance.get(`/server/${id}/`);
  return response.data;
};
