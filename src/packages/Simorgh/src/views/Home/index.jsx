import InApp from '@/layouts/InApp.jsx';
import ClusterGraph from './components/ClusterGraph/ClusterGraph.jsx';
import ClusterManagement from './components/ClusterManagement/ClusterManagement.jsx';
import { ServiceProvider } from './services/index.jsx';

export default function Clusters() {
  return (
    <ServiceProvider>
      <InApp>
        <ClusterGraph />
        <ClusterManagement />
      </InApp>
    </ServiceProvider>
  );
}
