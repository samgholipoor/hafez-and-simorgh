import { DeviceManagementProvider } from './deviceManagementProvider.jsx';
import { ClusterManagementProvider } from './clusterManagementProvider.jsx';
import { JobIDProvider } from './jobIDProvider.jsx';
import { ServiceSelectionProvider } from './serviceSelectionProvider.jsx';

export function ServiceProvider({ children }) {
  return (
    <ClusterManagementProvider>
      <ServiceSelectionProvider>
        <DeviceManagementProvider>
          <JobIDProvider>{children}</JobIDProvider>
        </DeviceManagementProvider>
      </ServiceSelectionProvider>
    </ClusterManagementProvider>
  );
}
