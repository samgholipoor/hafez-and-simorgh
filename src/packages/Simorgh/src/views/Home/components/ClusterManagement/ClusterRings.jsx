import { useCallback, useState } from 'react';
import { useClusterSelection } from '@/services/clusterSelectionProvider.jsx';
import ClusterManagementHeader from './ClusterManagementHeader.jsx';
import ClusterManagementBody from './ClusterManagementBody.jsx';

export default function ClusterRings({ onClose }) {
  const { cluster, isLoading, onForceReload } = useClusterSelection();

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <ClusterManagementHeader
        onClose={onClose}
        onToggle={handleToggle}
        onForceReload={onForceReload}
        isOpen={isOpen}
        isLoading={isLoading}
      />

      {isOpen ? <ClusterManagementBody isLoading={isLoading} cluster={cluster} /> : null}
    </div>
  );
}
