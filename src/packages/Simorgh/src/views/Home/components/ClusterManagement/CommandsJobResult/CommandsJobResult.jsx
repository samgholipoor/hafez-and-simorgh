import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import StdoutResult from '@/components/StdoutResult.jsx';
import ResultStatus from '@/components/ResultStatus.jsx';
import { getJob } from '@/services/api/index.js';
import { useClusterSelection } from '@/services/clusterSelectionProvider.jsx';
import { useJobID } from '../../../services/jobIDProvider.jsx';
import { useDeleteClusterDraft } from '../../../hooks/useDeleteClusterDraft.js';

function CommandsJobResult() {
  const { onForceReload } = useClusterSelection();
  const { closeCommandsJobModal, commandsJobId } = useJobID();
  const { handleDeleteClusterDraft } = useDeleteClusterDraft();

  const [resultStatus, setResultStatus] = useState('');
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [resultDescription, setResultDescription] = useState(false);

  const { data: jobDetail, refetch } = useQuery({
    queryKey: ['jobDetail', commandsJobId, 0],
    queryFn: (body) => getJob(body),
    onSuccess: (data) => {
      if (data?.finished !== true) return;

      if (data?.failed === false) {
        handleDeleteClusterDraft();
        onForceReload();
      }
      setResultStatus(data?.failed === true ? 'error' : 'success');
      setResultDescription(data?.description);
      setResultModalOpen(true);
    },
    enabled: false,
  });

  useEffect(() => {
    let intervalId = null;
    if (commandsJobId) {
      intervalId = setInterval(async () => {
        const response = await refetch();
        const { finished } = response?.data || {};
        if (finished === true) {
          clearInterval(intervalId);
        }
      }, 4000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [commandsJobId]);

  return (
    <>
      <StdoutResult
        content={jobDetail?.lines?.join('\n')}
        finished={jobDetail?.finished}
        onClose={closeCommandsJobModal}
      />

      {resultModalOpen ? (
        <ResultStatus
          status={resultStatus}
          description={resultDescription}
          onClose={() => {
            setResultModalOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

export default CommandsJobResult;
