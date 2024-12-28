import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Button } from '@burna/monster-design-system';
import { getCluster } from '@/services/api';
import { useProductSelection } from '@/services/productSelectionProvider';
import Accordion from '@/components/Accordion';
import Tab from '@/components/Tabs';
import EditableField from '@/components/form/EditableField';
import EmptyFallback from '@/components/EmptyFallback.jsx';
import SuspenseFallback from '@/components/SuspenseFallback.jsx';
import ClusterUpdateNotification from './ClusterUpdateNotification';
import DevicesManagement from '../DevicesManagement/DevicesManagement.jsx';

const ClusterManagementBody = ({}) => {
  const [openDevicesModal, setOpenDevicesModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { selectedProductOption } = useProductSelection();

  const { data: cluster, isLoading: loadingCluster } = useQuery(
    ['cluster', selectedProductOption?.value],
    getCluster,
  );

  const handleSubmitReplication = () => {};
  const handleSubmitMinPartHour = () => {};

  const handleOpenDevices = useCallback((serviceName) => {
    setOpenDevicesModal(true);
    console.log(serviceName);
  }, []);

  const render = useCallback(() => {
    if (loadingCluster) {
      return <SuspenseFallback />;
    }

    if (cluster?.services?.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {cluster.services.map((service) => (
            <Accordion title={service.name}>
              <div className="flex flex-col gap-4 p-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <EditableField
                    name="replication"
                    label="replication"
                    value={service.replication}
                    onSubmit={handleSubmitReplication}
                  />
                  <EditableField
                    name="min_part_hours"
                    label="Min_part_hour"
                    value={service.min_part_hours}
                    onSubmit={handleSubmitMinPartHour}
                  />
                  <EditableField
                    name="devices_count"
                    label="Devices"
                    value={service.devices_count}
                    onSubmit={handleSubmitMinPartHour}
                    readOnly
                  />
                  <EditableField
                    name="hosts_count"
                    label="Hosts"
                    value={service.hosts_count}
                    onSubmit={handleSubmitMinPartHour}
                    readOnly
                  />
                </div>
                <Button
                  text="Devices"
                  className="w-full"
                  onClick={handleOpenDevices.bind(null, service.name)}
                />
              </div>
            </Accordion>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        <EmptyFallback />
      </div>
    );
  }, [cluster, loadingCluster, handleOpenDevices]);

  return (
    <div
      className="bg-white shadow-lg py-8 px-6 flex flex-col gap-8 rounded-b-lg overflow-auto"
      style={{ maxHeight: 'calc(100vh - 200px)' }}
    >
      {/* <ClusterUpdateNotification /> */}

      <Tab tabIndex={tabIndex}>
        <Tab.Item onClick={() => setTabIndex(0)}>Services</Tab.Item>
        <Tab.Item onClick={() => setTabIndex(1)}>Hosts</Tab.Item>
      </Tab>

      {render()}

      {openDevicesModal ? (
        <div className="fixed top-24" style={{ right: '440px' }}>
          <DevicesManagement
            onClose={() => {
              setOpenDevicesModal(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ClusterManagementBody;
