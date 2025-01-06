import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { Icon } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname';

function EditableField({
  name,
  label,
  draftValue,
  value,
  readOnly = false,
  onChange = () => {},
  onSubmit = () => Promise.resolve(),
}) {
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (formData) => {
    setIsEdit(false);
    return onSubmit(formData);
  };

  return (
    <Formik
      initialValues={{
        [name]: draftValue || value,
      }}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor={label}
              className="text-gray-600 flex justify-between items-center"
            >
              {label}
            </label>
            {!readOnly && !isEdit ? (
              <button
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                <Icon
                  type="edit"
                  className="block w-5 h-5 bg-gray-600 transition-all duration-300"
                />
              </button>
            ) : null}
          </div>

          <div className="flex items-stretch gap-1">
            <Field
              id={label}
              name={name}
              className={mergeClassNames('border p-2 rounded w-full', {
                'bg-gray-100 text-gray-400': !isEdit || readOnly,
                'bg-transparent text-gray-600': isEdit,
                'border-gray-400': !draftValue,
                'border-warning': draftValue,
              })}
              disabled={!isEdit || readOnly}
              value={draftValue || value}
              onChange={(e) => onChange({ [name]: e.target.value })}
            />
            {!readOnly && isEdit ? (
              <button type="sumbit" className="border border-gray-400 p-2 rounded">
                <Icon
                  type="check"
                  className="block w-5 h-5 bg-gray-600 transition-all duration-300"
                />
              </button>
            ) : null}
          </div>

          {draftValue ? (
            <span className="text-xs text-warning">prev-val: {value}</span>
          ) : null}
        </div>
      </Form>
    </Formik>
  );
}

export default EditableField;
