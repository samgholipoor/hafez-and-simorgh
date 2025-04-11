import { useState } from 'react';
import { Formik, Form } from 'formik';
import Box from '@/components/Box.jsx';
import { useClusterSelectionOnGraphSettings } from '@/views/Home/services/ClusterSelectionOnGraphSettingsProvider.jsx';
import { generateUUID } from '@/utils/uuid.js';
import ConfigurationsTable from './ConfigurationsTable.jsx';
import ConfigurationsArrayField from './ConfigurationsArrayField.jsx';

const mockParams = [
  {
    id: 1,
    section: '[filter:kolon]',
    parameter: 'username',
    value: 'swift',
  },
  {
    id: 2,
    section: '[filter:kolon]',
    parameter: 'password',
    value: 'my_pass',
  },
];

export default function Index() {
  const [params, setParams] = useState(mockParams);

  const { selectedConfiguration, handleSelectedConfiguration } =
    useClusterSelectionOnGraphSettings();

  const handleAddRow = () => {
    setParams([
      ...params,
      {
        id: generateUUID(),
        section: '[filter:kolon]',
        parameter: '',
        value: '',
      },
    ]);
  };

  const handleRemoveRow = (id) => {
    setParams((prevParams) => {
      const index = prevParams.findIndex((p) => p.id === id);
      return [...prevParams.slice(0, index), ...prevParams.slice(index + 1)];
    });
  };

  const handleSubmit = (e) => {
    console.log('sumbited:');
    console.log(e);
  };

  return (
    <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 154px)' }}>
      <Box className="flex flex-col gap-4 p-4" style={{ width: '542px' }}>
        <p className="text-center">
          {selectedConfiguration?.title || selectedConfiguration}
        </p>
        <div>
          <Formik
            initialValues={{ configList: params }}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values }) => {
              setParams(values.configList);

              return (
                <Form className="h-full flex flex-col justify-between">
                  <ConfigurationsTable>
                    <ConfigurationsTable.Row type="header">
                      <ConfigurationsTable.Field>Section</ConfigurationsTable.Field>
                      <ConfigurationsTable.Field>Parameter</ConfigurationsTable.Field>
                      <ConfigurationsTable.Field>Value</ConfigurationsTable.Field>
                      <ConfigurationsTable.Field />
                    </ConfigurationsTable.Row>

                    <ConfigurationsArrayField
                      values={values.configList}
                      handleRemoveRow={handleRemoveRow}
                    />
                  </ConfigurationsTable>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div>
          <button
            className="bg-[#E0F2FE] hover:bg-opacity-60 active:bg-opacity-90 transition-all text-[#0086C9] px-4 py-2 text-sm rounded"
            onClick={handleAddRow}
          >
            Add row
          </button>
        </div>
        <div className="flex justify-between gap-2 mt-2">
          <button
            className="flex-1 btn btn-success btn-sm h-10 text-white"
            onClick={() => {}}
            disabled
          >
            Save
          </button>
          <button
            className="flex-1 btn btn-outline btn-sm h-10"
            onClick={() => handleSelectedConfiguration(null)}
          >
            Close
          </button>
        </div>
      </Box>
    </div>
  );
}
