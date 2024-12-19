import { Formik, Field, Form } from 'formik';
import { Icon } from '@burna/monster-design-system';
import { useProductSelection } from '@/services/productSelectionProvider';

const ClusterNameEdit = ({ isEdit, onFinish }) => {
  const { selectedProductOption } = useProductSelection();

  const handleSubmit = async (formData) => {
    await new Promise((r) => setTimeout(r, 0));

    onFinish();
  };

  if (!isEdit) {
    return <h2 className="text-2xl">{selectedProductOption?.label}</h2>;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Formik
        initialValues={{
          'cluster-name': selectedProductOption?.label,
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex items-stretch gap-2">
            <Field
              name="cluster-name"
              className="bg-transparent border border-gray-400 py-1 px-2 rounded"
            />
            <button type="sumbit" className="border border-gray-400 p-2 rounded">
              <Icon
                type="check"
                className="block w-5 h-5 bg-gray-600 transition-all duration-300"
              />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ClusterNameEdit;
