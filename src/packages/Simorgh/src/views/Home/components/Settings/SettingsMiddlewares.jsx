import { useState } from 'react';
import { Icon, Checkbox } from '@burna/monster-design-system';
import { ReactSortable } from 'react-sortablejs';
import Accordion from './Accordion.jsx';
import { useClusterSelectionOnGraphSettings } from '../../services/ClusterSelectionOnGraphSettingsProvider.jsx';

function SettingsMiddlewares() {
  const { handleSelectedConfiguration } = useClusterSelectionOnGraphSettings();

  const configurations = [
    {
      title: 'Middlewares of Proxy Server',
    },
    {
      title: 'Middlewares of Object Server',
    },
    {
      title: 'Middlewares of Container Server',
    },
    {
      title: 'Middlewares of Account Server',
    },
  ];

  const [words, setWords] = useState(['Hello', 'Hi', 'How are you', 'Cool']);

  return (
    <div className="flex flex-col gap-2">
      {configurations.map((conf) => (
        <Accordion title={conf.title}>
          <ReactSortable
            list={words}
            setList={setWords}
            animation={300}
            ghostClass="bg-red"
            className="flex flex-col gap-1"
            handle=".handle"
          >
            {words.map((word) => {
              const [checked, setChecked] = useState(false);

              return (
                <div
                  key={word}
                  className="bg-[#F1F2F5] flex justify-between items-center px-6 py-1"
                >
                  <span className="text-base font-light">{word}</span>
                  <div className="flex gap-2">
                    <Checkbox checked={checked} onChange={setChecked} />
                    <button
                      onClick={() => {
                        handleSelectedConfiguration(word);
                      }}
                    >
                      <Icon
                        type="settings"
                        className="block w-4 h-4 bg-gray-600 transition-all duration-300"
                      />
                    </button>
                    <button className="handle">
                      <Icon
                        type="filter-lines"
                        className="block w-4 h-4 bg-gray-600 transition-all duration-300"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </ReactSortable>
        </Accordion>
      ))}
    </div>
  );
}

export default SettingsMiddlewares;
