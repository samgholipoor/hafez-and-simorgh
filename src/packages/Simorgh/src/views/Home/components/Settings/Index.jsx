import { useClusterSelectionOnGraphSettings } from '../../services/ClusterSelectionOnGraphSettingsProvider.jsx';
import SettingsConfiguration from './SettingsConfiguration.jsx';
import SettingsMiddlewares from './SettingsMiddlewares.jsx';
import SettingsServiceInformation from './SettingsServiceInformation.jsx';
import Tabs from './Tabs.jsx';

export default function Settings() {
  const { selectedClusterOnGraphSettings, handleSelectClusterOnGraphSettings } =
    useClusterSelectionOnGraphSettings();

  return (
    <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 154px)' }}>
      <Tabs
        title={`Server ${selectedClusterOnGraphSettings.metadata.ip} in ${selectedClusterOnGraphSettings.cluster.title}`}
        tabs={[
          { title: 'Service Information', icon: 'file-text' },
          { title: 'Configuration', icon: 'sliders' },
          { title: 'Middlewares', icon: '2-layers' },
        ]}
      >
        <Tabs.Container>
          <SettingsServiceInformation />
        </Tabs.Container>
        <Tabs.Container>
          <SettingsConfiguration />
        </Tabs.Container>
        <Tabs.Container>
          <SettingsMiddlewares />
        </Tabs.Container>

        <Tabs.Footer>
          <div className="flex justify-between gap-2 mt-2">
            <button
              className="flex-1 btn btn-success btn-sm h-10 text-white"
              onClick={() => {}}
              disabled
            >
              Apply
            </button>
            <button
              className="flex-1 btn btn-outline btn-sm h-10"
              onClick={() => handleSelectClusterOnGraphSettings(null)}
            >
              Close
            </button>
          </div>
        </Tabs.Footer>
      </Tabs>
    </div>
  );
}
