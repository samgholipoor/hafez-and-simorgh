import { useMemo } from 'react';
import { Formik, Form } from 'formik';
import { Icon } from '@burna/monster-design-system';
import makeServiceDevices from '@/views/Home/utils/makeServiceDevices.js';
import DevicesArrayField from './DevicesArrayField.jsx';
import { useDeviceManagement } from '../../../services/deviceManagementProvider.jsx';

function CurrentDevicesForm({ onFinish, devices, onAddNewDeviceClick }) {
  const { currentServiceDevices, removeDevices, setWeightDevices, revertRemoveDevice } =
    useDeviceManagement();

  const currentDevices = useMemo(() => {
    const addedDevices = currentServiceDevices?.['add-device'] || [];
    const removedDevices = currentServiceDevices?.['remove-device'] || [];
    const weightedDevices = currentServiceDevices?.['set-weight'] || [];

    const includedDevices = devices
      .filter((d) => d.included)
      .map((device) => {
        for (let i = 0; i < removedDevices.length; i++) {
          const removedDevice = removedDevices[i];
          if (removedDevice.host === device.host && removedDevice.name === device.name) {
            return {
              ...device,
              'remove-device': removedDevice['remove-device'],
            };
          }
        }
        return device;
      })
      .map((device) => {
        for (let i = 0; i < weightedDevices.length; i++) {
          const weightedDevice = weightedDevices[i];
          if (
            weightedDevice.host === device.host &&
            weightedDevice.name === device.name
          ) {
            return {
              ...device,
              'set-weight': weightedDevice['set-weight'],
            };
          }
        }
        return device;
      });

    const aggregatedDevices = [...includedDevices, ...(addedDevices || [])];

    const uncheckedDevices = aggregatedDevices.map((aggregatedDevice) => {
      return {
        ...aggregatedDevice,
        checked: false,
      };
    });

    return makeServiceDevices(uncheckedDevices);
  }, [devices, currentServiceDevices]);

  const handleSubmit = (formData) => {
    const deletedDevices = Object.values(formData)
      .flat()
      .filter((device) => device?.checked)
      .map((d) => ({
        ...d,
        'remove-device': true,
      }));

    removeDevices(deletedDevices);
    return Promise.resolve();
  };

  return (
    <>
      <div className="flex justify-between bg-indigo-100 -mx-6 px-6 py-2">
        <div>
          <p className="opacity-80"> Current Devices </p>
          <p className="text-xs opacity-50">
            Click on `Add new devices` button to add new device
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary flex items-center gap-2"
          onClick={onAddNewDeviceClick}
          style={{ minHeight: '40px', maxHeight: '40px' }}
        >
          <span className="text-white"> Add new device </span>
          <Icon
            type="plus"
            className="block w-5 h-5 bg-white transition-all duration-300"
          />
        </button>
      </div>
      <Formik initialValues={currentDevices} onSubmit={handleSubmit} enableReinitialize>
        {({ values }) => {
          const deviceCount = Object.values(values)
            .flat()
            .filter((device) => device.checked).length;

          return (
            <Form className="h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6 pb-8">
                <DevicesArrayField
                  values={values}
                  revertRemoveDevice={revertRemoveDevice}
                  setWeightDevices={setWeightDevices}
                />
              </div>

              <div className="sticky bottom-0 bg-white py-2 shadow-lg border-t -mx-6 px-6 flex flex-row-reverse gap-4 justify-between">
                <button
                  type="button"
                  className="btn btn-primary flex-1"
                  style={{ minHeight: '40px', maxHeight: '40px' }}
                  onClick={onFinish}
                >
                  Ok
                </button>
                <button
                  type="submit"
                  className="text-white btn btn-error flex-1"
                  style={{ minHeight: '40px', maxHeight: '40px' }}
                  disabled={deviceCount === 0}
                >
                  Remove ( {deviceCount} )
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default CurrentDevicesForm;
