import { DeviceManagementProvider } from './deviceManagementProvider.jsx';
import { ClusterManagementProvider } from './clusterManagementProvider.jsx';
import { JobIDProvider } from './jobIDProvider.jsx';
import { ServiceSelectionProvider } from './serviceSelectionProvider.jsx';
import { ClusterSelectionOnGraphSettingsProvider } from './ClusterSelectionOnGraphSettingsProvider.jsx';

export function ServiceProvider({ children }) {
  return (
    <ClusterManagementProvider>
      <ServiceSelectionProvider>
        <DeviceManagementProvider>
          <JobIDProvider>
            <ClusterSelectionOnGraphSettingsProvider>
              {children}
            </ClusterSelectionOnGraphSettingsProvider>
          </JobIDProvider>
        </DeviceManagementProvider>
      </ServiceSelectionProvider>
    </ClusterManagementProvider>
  );
}
