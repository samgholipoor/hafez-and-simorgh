import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { submitCommands } from '@/services/api/index.js';
import { useClusterSelection } from '@/services/clusterSelectionProvider';
import PreviewChangesHeader from './PreviewChangesHeader.jsx';
import PreviewChangesBody from './PreviewChangesBody.jsx';
import { useClusterManagement } from '../../../services/clusterManagementProvider.jsx';
import { useGetSubmitingCommands } from '../../../hooks/useGetSubmitingCommands.js';
import { useJobID } from '../../../services/jobIDProvider.jsx';

function PreviewChanges() {
  const { selectedCluster } = useClusterSelection();
  const { closePreviewChangesModal } = useClusterManagement();
  const { handleSetCommandsJobId, openCommandsJobModal } = useJobID();
  const submitingCommands = useGetSubmitingCommands();

  const { mutate, isLoading } = useMutation(submitCommands, {
    onSuccess: (data) => {
      handleSetCommandsJobId(data.job_id);
      openCommandsJobModal();
      toast('Config changes applied successfully', { type: 'success' });
      closePreviewChangesModal();
    },
    onError: () => {
      toast('Config changes failed', { type: 'error' });
    },
  });

  const handleSubmit = () => {
    mutate({ id: selectedCluster.value, data: submitingCommands });
  };

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-40 h-screen w-screen">
      <div
        className="max-w-6xl w-full flex flex-col gap-2 fixed right-1/2 transform translate-x-1/2"
        style={{ top: '110px' }}
      >
        <PreviewChangesHeader onClose={closePreviewChangesModal} />
        <PreviewChangesBody
          onSubmit={handleSubmit}
          onClose={closePreviewChangesModal}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default PreviewChanges;
