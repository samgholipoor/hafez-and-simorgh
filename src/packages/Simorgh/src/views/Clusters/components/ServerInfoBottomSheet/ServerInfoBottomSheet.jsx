import EmptyFallback from '@/components/EmptyFallback.jsx';
import SuspenseFallback from '@/components/SuspenseFallback.jsx';
import { getServer } from '@/services/api/index.js';
import React, { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="stroke-info h-6 w-6 shrink-0"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

function ServerInfoBottomSheet({ host, onClose }) {
  const queryClient = useQueryClient();

  const {
    data: server,
    isLoading,
    mutate: fetchServer,
  } = useMutation({
    mutationFn: (sID) => {
      const data = queryClient.getQueryData(['server', sID]);
      if (data) {
        return data;
      }
      return getServer(sID);
    },
    onSuccess: (data, sID) => {
      queryClient.setQueryData(['server', sID], data);
    },
  });

  useEffect(() => {
    if (host) {
      fetchServer(host);
    }
  }, [host]);

  const render = useCallback(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-full">
          <SuspenseFallback />
        </div>
      );
    }

    if (server) {
      return (
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-1">
            <Icon />
            <span className="text-info text-lg">Server Information</span>
          </div>
          <div className="flex flex-col gap-2 items-start text-gray-500 text-sm">
            <p>
              <strong>CPU: </strong> {server?.cpu}
            </p>
            <p>
              <strong>Memory: </strong> {server?.memory}
            </p>
            <p>
              <strong>Storage: </strong> {server?.storage}
            </p>
          </div>
          <div className="w-full flex justify-end">
            <button className="btn btn-sm btn-primary mt-2" onClick={onClose}>
              Ok
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col justify-center items-center">
        <EmptyFallback />
        <button className="btn btn-sm btn-primary mt-2 self-end" onClick={onClose}>
          Ok
        </button>
      </div>
    );
  }, [server, isLoading]);

  return (
    <div
      role="alert"
      className="alert bg-white shadow-md w-96 fixed bottom-10 left-1/2 transform -translate-x-1/2"
    >
      {render()}
    </div>
  );
}

ServerInfoBottomSheet.propTypes = {};

export default ServerInfoBottomSheet;
