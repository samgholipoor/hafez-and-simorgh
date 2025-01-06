import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Icon } from '@burna/monster-design-system';
import { useClusterSelection } from '@/services/clusterSelectionProvider';
import { submitCommands } from '@/services/api/index.js';
import Spinner from '@/components/Spinner.jsx';
import { useJobID } from '../../services/jobIDProvider.jsx';

function RebalanceNotification({ commands }) {
  const { selectedCluster } = useClusterSelection();
  const { openRebalanceJobModal, handleSetRebalanceJobId } = useJobID();

  const { mutate, isLoading } = useMutation(submitCommands, {
    onSuccess: (data) => {
      handleSetRebalanceJobId(data.job_id);
      openRebalanceJobModal();
    },
    onError: () => {
      toast('Something went wrong!', { type: 'error' });
    },
  });

  const handleSubmit = () => {
    mutate({
      id: selectedCluster.value,
      data: {
        rings: commands,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 border rounded-lg p-2 bg-gray-50">
      <div className="flex gap-4 items-center">
        <Icon type="alert-triangle" className="block w-5 h-5 bg-yellow-500" />
        <p className="text-yellow-500">Caution!</p>
      </div>
      <p className="text-sm text-gray-600">
        Ring imbalance detected! A rebalance is required to maintain data distribution and
        system reliability.
      </p>
      <p className="text-sm font-bold text-gray-600">Please Rebalance</p>
      <div className="flex justify-between gap-2 mt-2">
        <button className="w-full btn btn-sm h-10" onClick={handleSubmit}>
          {isLoading ? <Spinner className="w-6 h-6" /> : 'Rebalance'}
        </button>
      </div>
    </div>
  );
}

export default RebalanceNotification;
