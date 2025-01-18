import PreviewChanges from './PreviewChanges/PreviewChanges.jsx';
import RebalanceJobResult from './RebalanceJobResult/RebalanceJobResult.jsx';
import CommandsJobResult from './CommandsJobResult/CommandsJobResult.jsx';
import { useClusterManagement } from '../../services/clusterManagementProvider.jsx';
import { useJobID } from '../../services/jobIDProvider.jsx';
import DevicesManagement from './DevicesManagement/DevicesManagement.jsx';
import { useServiceSelection } from '../../services/serviceSelectionProvider.jsx';
import ClusterRings from './ClusterRings.jsx';

function ClusterManagementContainer({ onClose }) {
  const { isPreviewChangesModalOpen } = useClusterManagement();
  const { isDeviceManagementModalOpen } = useServiceSelection();
  const { isCommandsJobModalOpen, isRebalanceJobModalOpen } = useJobID();

  return (
    <>
      <ClusterRings onClose={onClose} />

      {isDeviceManagementModalOpen ? <DevicesManagement /> : null}
      {isPreviewChangesModalOpen ? <PreviewChanges /> : null}
      {isCommandsJobModalOpen ? <CommandsJobResult /> : null}
      {isRebalanceJobModalOpen ? <RebalanceJobResult /> : null}
    </>
  );
}

export default ClusterManagementContainer;
