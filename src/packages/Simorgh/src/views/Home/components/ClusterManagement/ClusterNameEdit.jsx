import { Formik, Field, Form } from 'formik';
import { Icon } from '@burna/monster-design-system';
import { useClusterSelection } from '@/services/clusterSelectionProvider';
import { useMutation } from 'react-query';
import { updateCluster } from '@/services/api/index.js';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner.jsx';
import { useApp } from '@/services/appProvider.jsx';

function ClusterNameEdit({ isEdit, onFinish }) {
  const { handleHardRefresh } = useApp();

  const { selectedCluster, handleSelectCluster } = useClusterSelection();

  const { mutateAsync, isLoading } = useMutation(updateCluster, {
    onSuccess() {
      handleHardRefresh();
      toast('Cluster name is changed', { type: 'success' });
      onFinish();
    },
    onError(error) {
      const errorMessage = error?.response?.data?.error;
      toast(errorMessage || 'Something went wrong', { type: 'error' });
    },
  });

  const handleSubmit = async (formData) => {
    return mutateAsync({ id: selectedCluster.value, body: formData }).then(() => {
      handleSelectCluster({ value: selectedCluster?.value, label: formData.name });
    });
  };

  if (!isEdit) {
    return <h2 className="text-2xl">{selectedCluster?.label}</h2>;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Formik
        initialValues={{
          name: selectedCluster?.label,
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex items-stretch gap-2">
            <Field
              name="name"
              className="bg-transparent border border-gray-400 py-1 px-2 rounded"
            />
            <button type="sumbit" className="border border-gray-400 p-2 rounded">
              {isLoading ? (
                <Spinner className="w-5 h-5" />
              ) : (
                <Icon
                  type="check"
                  className="block w-5 h-5 bg-gray-600 transition-all duration-300"
                />
              )}
            </button>
            <button onClick={onFinish} className="border border-gray-400 p-2 rounded">
              <Icon
                type="x"
                className="block w-5 h-5 bg-gray-600 transition-all duration-300"
              />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ClusterNameEdit;
