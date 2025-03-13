import { useMemo } from 'react';
import { useClusterSelectionOnGraphSettings } from '../../services/ClusterSelectionOnGraphSettingsProvider.jsx';

function TableData({ children }) {
  return <td className="text-base px-6 py-3 bg-[#F9FAFB]">{children}</td>;
}

export default function SettingsServiceInformation() {
  const { selectedClusterOnGraphSettings } = useClusterSelectionOnGraphSettings();

  const data = useMemo(
    () => ({
      'Cluster Name': selectedClusterOnGraphSettings.cluster.title,
      'Node name: IP': `${selectedClusterOnGraphSettings.metadata.host}: ${selectedClusterOnGraphSettings.metadata.ip}`,
      'Swift version': '-',
      'Monster Version': '-',
      'Node architecture': '-',
    }),
    [selectedClusterOnGraphSettings],
  );

  return (
    <div>
      <table className="w-full">
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr className="divide-x-2 border-b-2 border-white" key={`${key}-${value}`}>
              <TableData>{key}</TableData>
              <TableData>{value}</TableData>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
