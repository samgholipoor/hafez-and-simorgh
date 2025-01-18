import { useMemo, useState } from 'react';
import Spinner from '@/components/Spinner.jsx';
import { getFromStorage } from '@/utils/storage.js';
import { useClusterManagement } from '../../../services/clusterManagementProvider.jsx';
import ServersInfoList from './ServersInfoList.jsx';

function MetadataRowItem({ title, description }) {
  return (
    <div className="flex flex-col text-sm">
      <div className="px-6 py-2 bg-gray-100">{title}</div>
      <div className="px-6 py-3 text-xs font-bold">New Value: {description}</div>
    </div>
  );
}

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border rounded-md">
      <div className="cursor-pointer px-6 p-4" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </div>
      {isOpen ? <div>{children}</div> : null}
    </div>
  );
}

function ServiceInfo({ title, metadata, devices }) {
  return (
    <Accordion title={title} isFirstOpen>
      {metadata?.draft_replication >= 0 ? (
        <MetadataRowItem title="Replication" description={metadata.draft_replication} />
      ) : null}
      {metadata?.draft_min_part_hours >= 0 ? (
        <MetadataRowItem
          title="Min Part Hour"
          description={metadata.draft_min_part_hours}
        />
      ) : null}
      {devices ? <ServersInfoList devices={devices} /> : null}
    </Accordion>
  );
}

function ClusterManagementBody({ onSubmit, onClose, isLoading }) {
  const { clusterMetadata, currentKey } = useClusterManagement();

  const devicesModifications = useMemo(() => {
    const finalChange = {};

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(currentKey) && currentKey !== key) {
        const serviceName = key.slice(key.indexOf('-') + 1);
        finalChange[serviceName] = getFromStorage(key);
      }
    });

    return finalChange;
  }, [currentKey]);

  return (
    <div
      className="relative overflow-auto bg-white shadow-lg pt-8 pb-24 px-6 flex flex-col gap-3 rounded-b-lg"
      style={{ height: 'calc(100vh - 226px)' }}
    >
      {devicesModifications?.['object-server'] || clusterMetadata?.['object-server'] ? (
        <ServiceInfo
          title="Object-Server"
          metadata={clusterMetadata?.['object-server']}
          devices={devicesModifications?.['object-server']}
        />
      ) : null}

      {devicesModifications?.['account-server'] || clusterMetadata?.['account-server'] ? (
        <ServiceInfo
          title="Account-Server"
          metadata={clusterMetadata?.['account-server']}
          devices={devicesModifications?.['account-server']}
        />
      ) : null}

      {devicesModifications?.['container-server'] ||
      clusterMetadata?.['container-server'] ? (
        <ServiceInfo
          title="Container-Server"
          metadata={clusterMetadata?.['container-server']}
          devices={devicesModifications?.['container-server']}
        />
      ) : null}

      <div className="fixed bottom-0 left-0 w-full flex gap-4 px-6 py-2 border-t border-t-gray-400 bg-white">
        <button className="flex-1 btn btn-sm h-10" onClick={onClose}>
          Cancel
        </button>
        <button
          className="flex-1 btn btn-sm btn-primary h-10"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Spinner className="w-6 h-6" /> : 'Apply'}
        </button>
      </div>
    </div>
  );
}

export default ClusterManagementBody;
