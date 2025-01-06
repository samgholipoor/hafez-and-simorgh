import { useCallback, useMemo, useState } from 'react';
import Accordion from '@/components/Accordion';
import Tab from '@/components/Tabs';
import EditableField from '@/components/form/EditableField.jsx';
import EmptyFallback from '@/components/EmptyFallback.jsx';
import SuspenseFallback from '@/components/SuspenseFallback.jsx';
import { useClusterManagement } from '../../services/clusterManagementProvider.jsx';
import ClusterUpdateNotification from './ClusterUpdateNotification.jsx';
import { useTotalCountChanges } from '../../hooks/useTotalCountChanges.js';
import { useDeviceManagement } from '../../services/deviceManagementProvider.jsx';
import RebalanceNotification from './RebalanceNotification.jsx';
import { useServiceSelection } from '../../services/serviceSelectionProvider.jsx';

function ClusterManagementBody({ cluster, isLoading }) {
  const { clusterMetadata, setServiceMetaData } = useClusterManagement();
  const { openDeviceManagementModal } = useServiceSelection();
  const { setClusterServiceKey } = useDeviceManagement();
  const totalCountChanges = useTotalCountChanges();

  const [tabIndex, setTabIndex] = useState(0);

  const services = useMemo(() => {
    return cluster?.services?.map((service) => {
      return {
        ...service,
        ...(clusterMetadata?.[service.name] || null),
      };
    });
  }, [cluster, clusterMetadata]);

  const render = useCallback(() => {
    if (isLoading) {
      return <SuspenseFallback />;
    }

    if (services?.length > 0) {
      return (
        <div className="flex flex-col gap-4">
          {services.map((service) => (
            <Accordion title={service.name}>
              <div className="flex flex-col gap-4 p-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <EditableField
                    name="replication"
                    label="replication"
                    value={service.replication}
                    draftValue={service.draft_replication}
                    onChange={(formData) => setServiceMetaData(formData, service)}
                  />
                  <EditableField
                    name="min_part_hours"
                    label="Min_part_hour"
                    value={service.min_part_hours}
                    draftValue={service.draft_min_part_hours}
                    onChange={(formData) => setServiceMetaData(formData, service)}
                  />
                  <EditableField
                    name="devices_count"
                    label="Devices"
                    value={service.devices_count}
                    readOnly
                  />
                  <EditableField
                    name="hosts_count"
                    label="Hosts"
                    value={service.hosts_count}
                    readOnly
                  />
                </div>
                <button
                  className="w-full btn btn-sm h-10"
                  onClick={() => {
                    setClusterServiceKey(null);
                    openDeviceManagementModal(service);
                  }}
                >
                  Devices
                </button>
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
  }, [services, isLoading, setServiceMetaData]);

  const rebalanceCautions = useMemo(() => {
    if (!services || services?.length === 0) return [];

    return services
      .filter((service) => service.caution)
      .map((service) => {
        return {
          service: service?.name?.split('-')[0],
          command: 'rebalance',
        };
      });
  }, [services]);

  return (
    <div
      className="bg-white shadow-lg py-8 px-6 flex flex-col gap-8 rounded-b-lg overflow-auto"
      style={{ maxHeight: 'calc(100vh - 226px)' }}
    >
      <Tab tabIndex={tabIndex}>
        <Tab.Item onClick={() => setTabIndex(0)}>Services</Tab.Item>
        <Tab.Item onClick={() => setTabIndex(1)}>Hosts</Tab.Item>
      </Tab>

      {render()}

      {rebalanceCautions.length > 0 ? (
        <RebalanceNotification commands={rebalanceCautions} />
      ) : null}

      {totalCountChanges > 0 ? (
        <ClusterUpdateNotification totalCountChanges={totalCountChanges} />
      ) : null}
    </div>
  );
}

export default ClusterManagementBody;
