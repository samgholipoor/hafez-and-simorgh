import { useMemo } from 'react';
import { Formik, Form } from 'formik';
import makeServiceDevices from '@/views/Home/utils/makeServiceDevices.js';
import DevicesArrayField from './DevicesArrayField.jsx';
import { useDeviceManagement } from '../../../services/deviceManagementProvider';

function AddDevicesForm({ devices, onFinish, onClose, isAddState }) {
  const { currentServiceDevices, addNewDevices } = useDeviceManagement();

  const handleSubmit = (formData) => {
    const addedDevices = Object.values(formData)
      .flat()
      .filter((d) => d.checked)
      .map((d) => ({
        ...d,
        'add-device': true,
      }));

    addNewDevices(addedDevices);
    onFinish(addedDevices);
    return Promise.resolve(addedDevices);
  };

  const currentDevices = useMemo(() => {
    const addedDevices = currentServiceDevices?.['add-device'] || [];

    if (addedDevices.length > 0) {
      const filterDevices = devices.map((currentDevice) => {
        for (let i = 0; i < addedDevices.length; i++) {
          const addedDevice = addedDevices[i];
          if (
            addedDevice.host === currentDevice.host &&
            addedDevice.name === currentDevice.name
          ) {
            return addedDevice;
          }
        }

        return currentDevice;
      });

      return makeServiceDevices(filterDevices);
    }

    return makeServiceDevices(devices);
  }, [devices, currentServiceDevices]);

  return (
    <>
      <div className="flex justify-between bg-indigo-100 -mx-6 px-6 py-2">
        <div>
          <p className="opacity-80"> Add New Device </p>
          <p className="text-xs opacity-50">To add new device select disk</p>
        </div>
      </div>
      <Formik initialValues={currentDevices} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-6 pb-8">
              <DevicesArrayField values={values} isAddState={isAddState} />
            </div>

            <div className="sticky bottom-0 bg-white py-2 border-t -mx-6 px-6 flex flex-row-reverse gap-4 justify-between">
              <button
                type="submit"
                className="btn btn-primary flex-1"
                style={{ minHeight: '40px', maxHeight: '40px' }}
              >
                Ok
              </button>
              <button
                type="button"
                className="text-white btn flex-1"
                onClick={onClose}
                style={{ minHeight: '40px', maxHeight: '40px' }}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddDevicesForm;
