import React, { useState } from 'react';
import { Field, FieldArray } from 'formik';
import { Icon } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname.js';

function DeviceCheckBox({ name, checked, onChange }) {
  return (
    <label className="flex gap-2">
      <Field type="checkbox" name={name} checked={checked} onChange={onChange} />
      <span
        className={mergeClassNames('select-none', {
          'text-green-500': true,
        })}
      >
        {name}
      </span>
    </label>
  );
}

function EditWeight({ name, value, onChange }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex flex-col gap-1 ">
      <div className="flex items-center justify-between h-4">
        <label
          htmlFor={name}
          className="text-gray-600 text-xs flex justify-between items-center"
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
              className="cursor-pointer block w-4 h-4 bg-gray-600 transition-all duration-300"
            />
          </div>
        ) : null}
      </div>

      <div className="flex items-stretch gap-1">
        <Field
          id={name}
          value={value}
          name={name}
          className={mergeClassNames(
            'text-xs border border-gray-400 p-2 rounded w-full',
            {
              'opacity-50': !isEdit,
              'bg-transparent text-gray-600': isEdit,
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
    </div>
  );
}

function RenderArrayField({ arrayHelpers, groupName, groupDevices }) {
  const handleToggleField = (index, e) => {
    arrayHelpers.replace(index, {
      ...groupDevices[index],
      checked: e.target.checked,
    });
  };

  const handleToggleAllField = (e) => {
    for (let index = 0; index < groupDevices.length; index++) {
      handleToggleField(index, e);
    }
  };

  const handleWeightChange = (index, weight) => {
    arrayHelpers.replace(index, {
      ...groupDevices[index],
      weight: weight,
    });
  };

  return (
    <div className="flex flex-col gap-6 border-b pb-6">
      <div key={groupName} className="flex flex-col gap-4">
        <label className="flex gap-2">
          <Field
            type="checkbox"
            name={groupName}
            checked={groupDevices.every((groupDevice) => groupDevice.checked)}
            onChange={handleToggleAllField}
          />
          <span
            className={mergeClassNames('select-none', {
              'text-green-500': true,
            })}
          >
            {groupName}
          </span>
        </label>

        <div className="grid grid-cols-5 gap-4 ml-10 flex-wrap">
          {groupDevices.map((groupDevice, index) => (
            <div className="flex flex-col gap-2">
              <DeviceCheckBox
                name={groupDevice.name}
                checked={groupDevice.checked}
                onChange={handleToggleField.bind(null, index)}
              />

              <EditWeight
                name={`${groupDevice.name}-weight`}
                value={groupDevice.weight}
                onChange={handleWeightChange.bind(null, index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DevicesArrayField({ values }) {
  return (
    <>
      {Object.entries(values).map(([groupName, groupDevices]) => (
        <FieldArray
          name={groupName}
          render={(arrayHelpers) => (
            <RenderArrayField
              arrayHelpers={arrayHelpers}
              groupName={groupName}
              groupDevices={groupDevices}
            />
          )}
        />
      ))}
    </>
  );
}

export default DevicesArrayField;
