import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Icon } from '@burna/monster-design-system';
import EmptyFallback from '@/components/EmptyFallback.jsx';
import SuspenseFallback from '@/components/SuspenseFallback.jsx';
import { getDeviceInfo } from '@/services/api/index.js';

function InfoIcon() {
  return (
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
      />
    </svg>
  );
}

function DeviceInfoBottomSheet({ device, onClose }) {
  const queryClient = useQueryClient();

  const {
    data: rings,
    isLoading,
    mutate: fetchRingsInfo,
  } = useMutation({
    mutationFn: (d) => {
      const { clusterId, name, ip } = d;
      const data = queryClient.getQueryData([
        'rings-info-of-device',
        clusterId,
        name,
        ip,
      ]);
      if (data) {
        return data;
      }
      return getDeviceInfo(d);
    },
    onSuccess: (data, d) => {
      const { clusterId, name, ip } = d;
      queryClient.setQueryData(['rings-info-of-device', clusterId, name, ip], data);
    },
  });

  useEffect(() => {
    if (device) {
      fetchRingsInfo(device);
    }
  }, [device]);

  const ringsInfo = {
    account: {
      title: 'Account Ring',
      icon: 'user',
    },
    object: {
      title: 'Object Ring',
      icon: 'file-text',
    },
    container: {
      title: 'Container Ring',
      icon: 'box',
    },
  };

  const render = useCallback(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-full">
          <SuspenseFallback />
        </div>
      );
    }

    if (rings?.length > 0) {
      return (
        <div className="flex flex-col gap-2 items-start text-gray-500 text-sm">
          {rings.map((ring) => (
            <div key={ring} className="flex items-center gap-2">
              - <Icon type={ringsInfo[ring]?.icon} className="w-5 h-5 bg-gray-600" />
              <span className="text-lg">{ringsInfo[ring]?.title}</span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center w-full">
        <EmptyFallback message="There is no rings" />
      </div>
    );
  }, [rings, isLoading]);

  return (
    <div
      role="alert"
      className="alert bg-white shadow-md w-96 fixed bottom-10 left-1/2 transform -translate-x-1/2"
    >
      <div className="w-full flex flex-col items-start">
        <div className="flex flex-col mb-1">
          <div className="flex items-start gap-2">
            <InfoIcon />
            <span className="text-info text-lg">
              Device Rings - {device.name} ({device.ip})
            </span>
          </div>
        </div>

        {render()}

        <div className="w-full flex justify-end">
          <button className="btn btn-sm btn-primary mt-2 self-end" onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

DeviceInfoBottomSheet.propTypes = {};

export default DeviceInfoBottomSheet;
