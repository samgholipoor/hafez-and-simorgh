import { useClusterSelectionOnGraphSettings } from '../../services/ClusterSelectionOnGraphSettingsProvider.jsx';
import Accordion from './Accordion.jsx';

function SettingsConfiguration() {
  const { handleSelectedConfiguration } = useClusterSelectionOnGraphSettings();

  const configurations = [
    {
      title: 'Proxy Server Configurations',
    },
    {
      title: 'Object Server Configurations',
    },
    {
      title: 'Container Server Configurations',
    },
    {
      title: 'Account Server Configurations',
    },
    {
      title: 'Swift Configurations',
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {configurations.map((conf) => (
        <Accordion
          title={conf.title}
          onClick={() => {
            handleSelectedConfiguration(conf);
          }}
        />
      ))}
    </div>
  );
}

export default SettingsConfiguration;
