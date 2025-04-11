import { useState } from 'react';
import { Field, FieldArray } from 'formik';
import { Icon } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname.js';
import ConfigurationsTable from './ConfigurationsTable.jsx';

function EditableField({ index, value, name }) {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="flex gap-2">
      <div
        className={mergeClassNames({ 'tooltip tooltip-bottom': value?.length > 15 })}
        data-tip={value}
      >
        <Field
          type="text"
          name={`configList.${index}.${name}`}
          value={value}
          className={mergeClassNames('border px-2 rounded w-full', {
            'bg-[#E4E5E8]': !isEditable,
          })}
          disabled={!isEditable}
        />
      </div>
      {isEditable ? (
        <button type="button" onClick={() => setIsEditable(false)}>
          <Icon
            type="check"
            className="block w-5 h-5 bg-gray-600 transition-all duration-300"
          />
        </button>
      ) : (
        <button type="button" onClick={() => setIsEditable(true)}>
          <Icon
            type="edit"
            className="block w-5 h-5 bg-gray-600 transition-all duration-300"
          />
        </button>
      )}
    </div>
  );
}

function RenderArrayField({ index, data, handleRemoveRow }) {
  return (
    <ConfigurationsTable.Row type="body">
      <ConfigurationsTable.Field>{data.section}</ConfigurationsTable.Field>
      <ConfigurationsTable.Field>
        <EditableField index={index} name="parameter" value={data.parameter} />
      </ConfigurationsTable.Field>
      <ConfigurationsTable.Field>
        <EditableField index={index} name="value" value={data.value} />
      </ConfigurationsTable.Field>
      <ConfigurationsTable.Field>
        <button
          type="button"
          onClick={() => {
            handleRemoveRow(data.id);
          }}
        >
          <Icon type="trash" className="block w-4 h-4 bg-error" />
        </button>
      </ConfigurationsTable.Field>
    </ConfigurationsTable.Row>
  );
}

function ConfigurationsArrayField({ values, handleRemoveRow }) {
  return values?.map((param, index) => {
    return (
      <FieldArray
        key={param.id}
        name="configList"
        render={(arrayHelpers) => (
          <RenderArrayField
            arrayHelpers={arrayHelpers}
            data={param}
            index={index}
            handleRemoveRow={handleRemoveRow}
          />
        )}
      />
    );
  });
}

export default ConfigurationsArrayField;
