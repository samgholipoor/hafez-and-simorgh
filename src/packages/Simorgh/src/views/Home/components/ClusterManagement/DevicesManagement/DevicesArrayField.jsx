import { useCallback, useMemo, useState } from 'react';
import { Field, FieldArray } from 'formik';
import { Icon } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname.js';

function DeviceCheckBox({
  name,
  checked,
  onChange,
  included,
  isAddState,
  addedDevice,
  removedDevice,
  handleRevertRemovedDevice,
}) {
  const textColor = useMemo(() => {
    if (addedDevice) {
      return 'text-blue-500';
    }

    if (removedDevice) {
      return 'text-error';
    }

    if (isAddState) {
      return included ? 'text-gray-300' : 'text-gray-800';
    }

    return 'text-green-500';
  }, [isAddState, removedDevice, included]);

  return (
    <div className="flex items-center justify-between gap-1">
      <label className="flex items-center gap-1">
        <Field
          type="checkbox"
          className="checkbox checkbox-xs checkbox-secondary rounded-md"
          name={name}
          checked={removedDevice ? false : checked}
          onChange={onChange}
          disabled={(included && isAddState) || removedDevice}
        />

        <span className={mergeClassNames('select-none', textColor)}>{name}</span>
      </label>

      {removedDevice ? (
        <button type="button" onClick={handleRevertRemovedDevice}>
          <Icon
            type="rotate-ccw"
            className="cursor-pointer block w-4 h-4 bg-green-500 transition-all duration-300"
          />
        </button>
      ) : null}
    </div>
  );
}

function EditWeight({ name, value, draftValue, included, onChange }) {
  const [isEdit, setIsEdit] = useState(false);

  const inputValue = useMemo(() => {
    if (draftValue || draftValue === 0) {
      return draftValue;
    }
    return value;
  }, [draftValue, value]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between h-4">
        <label
          htmlFor={name}
          className="text-gray-500 text-xs flex justify-between items-center"
        >
          Weight
        </label>
        {!isEdit ? (
          <div
            onClick={() => {
              setIsEdit(true);
            }}
          >
            <Icon
              type="edit"
              className="cursor-pointer block w-4 h-4 bg-gray-500 transition-all duration-300"
            />
          </div>
        ) : null}
      </div>

      <div className="flex items-stretch gap-1">
        <Field
          id={name}
          value={inputValue}
          name={name}
          className={mergeClassNames(
            'text-xs border border-gray-400 px-2 py-1 rounded w-full',
            {
              'opacity-50': !isEdit,
              'bg-transparent text-gray-600': isEdit,
              'border-2 border-yellow-500': included && (draftValue || draftValue === 0),
            },
          )}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={!isEdit}
        />
        {isEdit ? (
          <button
            className="border border-gray-400 p-1 rounded flex justify-center items-center"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            <Icon
              type="check"
              className="block w-4 h-4 bg-gray-600 transition-all duration-300"
            />
          </button>
        ) : null}
      </div>

      {included && draftValue ? (
        <span className="text-xs text-gray-400">prev-val: {value || 'unset'}</span>
      ) : null}
    </div>
  );
}

function RenderArrayField({
  arrayHelpers,
  groupName,
  groupDevices,
  isLast,
  isAddState,
  revertRemoveDevice,
  setWeightDevices,
}) {
  const handleToggleField = (index, e) => {
    arrayHelpers.replace(index, {
      ...groupDevices[index],
      checked: e.target.checked,
    });
  };

  const handleToggleAllField = (e) => {
    for (let index = 0; index < groupDevices.length; index++) {
      if (isAddState) {
        const groupDevice = groupDevices[index];
        if (!groupDevice.included) {
          handleToggleField(index, e);
        }
      } else {
        handleToggleField(index, e);
      }
    }
  };

  const handleWeightChange = (index, weight) => {
    const device = groupDevices[index];
    setWeightDevices(device, weight);

    arrayHelpers.replace(index, {
      ...groupDevices[index],
      weight,
    });
  };

  const handleRevertRemovedDevice = (index) => {
    const device = groupDevices[index];
    delete device['remove-device'];

    revertRemoveDevice(device);
    arrayHelpers.replace(index, {
      ...groupDevices[index],
      checked: false,
    });
  };

  const checkedAll = useCallback(() => {
    if (isAddState) {
      return groupDevices.every((groupDevice) => {
        if (groupDevice.included) {
          return true;
        }

        return groupDevice.checked;
      });
    }

    return groupDevices.every((groupDevice) => groupDevice.checked);
  }, [isAddState, groupDevices]);

  return (
    <div
      className={mergeClassNames('flex flex-col pb-4', {
        'border-b': !isLast,
      })}
    >
      <div key={groupName} className="flex flex-col gap-2">
        <label className="flex items-center gap-1 inline-block w-fit">
          <Field
            type="checkbox"
            className="checkbox checkbox-xs checkbox-secondary rounded-md"
            name={groupName}
            checked={checkedAll()}
            onChange={handleToggleAllField}
          />
          <span className="select-none text-gray-500">{groupName}</span>
        </label>

        <div className="grid grid-cols-5 gap-x-4 gap-2 ml-10 flex-wrap">
          {groupDevices.map((groupDevice, index) => (
            <div className="flex flex-col gap-1">
              <DeviceCheckBox
                name={groupDevice.name}
                checked={groupDevice.checked}
                included={groupDevice.included}
                addedDevice={groupDevice['add-device']}
                removedDevice={groupDevice['remove-device']}
                isAddState={isAddState}
                onChange={(e) => handleToggleField(index, e)}
                handleRevertRemovedDevice={() => handleRevertRemovedDevice(index)}
              />

              {!isAddState ? (
                <EditWeight
                  name={`${groupDevice.host}-${groupDevice.name}`}
                  value={groupDevice.weight}
                  draftValue={groupDevice?.['set-weight']}
                  included={groupDevice.included}
                  onChange={(e) => handleWeightChange(index, e)}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DevicesArrayField({
  values,
  revertRemoveDevice,
  setWeightDevices,
  isAddState = false,
}) {
  return (
    <>
      {Object.entries(values).map(([groupName, groupDevices], index) => (
        <FieldArray
          key={groupName}
          name={groupName}
          render={(arrayHelpers) => (
            <RenderArrayField
              isLast={index === Object.keys(values).length - 1}
              arrayHelpers={arrayHelpers}
              groupName={groupName}
              groupDevices={groupDevices}
              isAddState={isAddState}
              revertRemoveDevice={revertRemoveDevice}
              setWeightDevices={setWeightDevices}
            />
          )}
        />
      ))}
    </>
  );
}

export default DevicesArrayField;
