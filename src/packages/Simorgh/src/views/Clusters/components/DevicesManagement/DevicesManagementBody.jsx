import { Formik, Form } from 'formik';
import DevicesArrayField from './DevicesArrayField.jsx';

const DevicesManagementBody = ({}) => {
  return (
    <div
      className="bg-white shadow-lg py-8 px-6 flex flex-col gap-8 rounded-b-lg overflow-auto"
      style={{ maxHeight: 'calc(100vh - 200px)' }}
    >
      <div>
        <Formik
          initialValues={{
            r1z1s1: [
              { name: 'sdb', checked: true, weight: 150 },
              { name: 'sdb', checked: false, weight: 200 },
              { name: 'sdc', checked: false, weight: 200 },
              { name: 'sdd', checked: false, weight: 200 },
              { name: 'sde', checked: false, weight: 200 },
            ],
            r1z1s2: [
              { name: 'sdb', checked: false, weight: 150 },
              { name: 'sdb', checked: false, weight: 200 },
              { name: 'sdc', checked: false, weight: 200 },
              { name: 'sdd', checked: false, weight: 200 },
              { name: 'sde', checked: false, weight: 200 },
            ],
            r1z2s3: [
              { name: 'sdb', checked: false, weight: 150 },
              { name: 'sdb', checked: false, weight: 200 },
            ],
          }}
          onSubmit={(e) => {
            console.log(e);
            return Promise.resolve();
          }}
        >
          {({ values }) => (
            <Form>
              <div className="flex flex-col gap-6">
                <DevicesArrayField values={values} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DevicesManagementBody;
