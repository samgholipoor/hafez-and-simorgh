import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { Icon } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname';

const EditableField = ({
  name,
  label,
  value,
  readOnly = false,
  onSubmit = () => Promise.resolve(),
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (formData) => {
    setIsEdit(false);
    return onSubmit(formData);
  };

  return (
    <Formik
      initialValues={{
        [name]: value,
      }}
      onSubmit={handleSubmit}
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
              <div
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                <Icon
                  type="edit"
                  className="block w-5 h-5 bg-gray-600 transition-all duration-300"
                />
              </div>
            ) : null}
          </div>

          <div className="flex items-stretch gap-1">
            <Field
              id={label}
              name={name}
              className={mergeClassNames('border border-gray-400 p-2 rounded w-full', {
                'bg-gray-100 text-gray-400': readOnly,
                'bg-transparent text-gray-600': !readOnly,
              })}
              disabled={readOnly}
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
        </div>
      </Form>
    </Formik>
  );
};

export default EditableField;
