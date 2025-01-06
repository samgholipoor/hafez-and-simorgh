import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getCluster } from '@/services/api/index.js';
import { useClusterSelection } from '@/services/clusterSelectionProvider';
import ClusterManagementHeader from './ClusterManagementHeader.jsx';
import ClusterManagementBody from './ClusterManagementBody.jsx';
import PreviewChanges from './PreviewChanges/PreviewChanges.jsx';
import RebalanceJobResult from './RebalanceJobResult/RebalanceJobResult.jsx';
import CommandsJobResult from './CommandsJobResult/CommandsJobResult.jsx';
import { useClusterManagement } from '../../services/clusterManagementProvider.jsx';
import { useJobID } from '../../services/jobIDProvider.jsx';
import DevicesManagement from './DevicesManagement/DevicesManagement.jsx';
import { useServiceSelection } from '../../services/serviceSelectionProvider.jsx';

function ClusterManagementContainer({ onClose }) {
  const { selectedCluster } = useClusterSelection();
  const { isPreviewChangesModalOpen } = useClusterManagement();
  const { isDeviceManagementModalOpen } = useServiceSelection();
  const { isCommandsJobModalOpen, isRebalanceJobModalOpen } = useJobID();

  const [isOpen, setIsOpen] = useState(true);

  const [queryParams, setQueryParams] = useState({ refresh: false, count: 1 });
  const {
    data: cluster,
    isLoading,
    refetch,
  } = useQuery(['cluster', selectedCluster.value, queryParams], getCluster, {
    enabled: !!selectedCluster.value,
  });

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onForceReload = () => {
    setQueryParams((prev) => ({ refresh: true, count: prev.count + 1 }));
  };

  useEffect(() => {
    refetch();
  }, []);

  const render = useCallback(() => {
    return (
      <div className="flex flex-col gap-2">
        <ClusterManagementHeader
          onClose={onClose}
          onToggle={handleToggle}
          onForceReload={onForceReload}
          isOpen={isOpen}
          isLoading={isLoading}
        />

        {isOpen ? (
          <ClusterManagementBody isLoading={isLoading} cluster={cluster} />
        ) : null}
      </div>
    );
  }, [isOpen, isLoading, cluster, onClose, handleToggle]);

  return (
    <>
      {render()}

      {isDeviceManagementModalOpen ? <DevicesManagement /> : null}
      {isPreviewChangesModalOpen ? <PreviewChanges /> : null}
      {isCommandsJobModalOpen ? <CommandsJobResult /> : null}
      {isRebalanceJobModalOpen ? <RebalanceJobResult /> : null}
    </>
  );
}

export default ClusterManagementContainer;
