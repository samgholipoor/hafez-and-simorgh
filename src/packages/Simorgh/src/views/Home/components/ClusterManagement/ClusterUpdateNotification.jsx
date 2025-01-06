import { Icon } from '@burna/monster-design-system';
import { useClusterManagement } from '../../services/clusterManagementProvider.jsx';
import { useDeleteClusterDraft } from '../../hooks/useDeleteClusterDraft.js';

function ClusterUpdateNotification({ totalCountChanges }) {
  const { handleDeleteClusterDraft } = useDeleteClusterDraft();
  const { openPreviewChangesModal } = useClusterManagement();

  return (
    <div className="flex flex-col gap-2 border rounded-lg p-2 bg-gray-50">
      <div className="flex gap-4 items-center">
        <Icon type="alert-triangle" className="block w-5 h-5 bg-yellow-500" />
        <p className="text-yellow-500">{totalCountChanges} Config Changes</p>
      </div>
      <p className="text-sm text-gray-600">
        before applying changes to the cluster, the preview of the changes will be shown.
      </p>
      <div className="flex justify-between gap-2 mt-2">
        <button
          className="flex-1 btn btn-success btn-sm h-10 text-white"
          onClick={openPreviewChangesModal}
        >
          Apply
        </button>
        <button
          className="flex-1 btn btn-outline btn-sm h-10"
          onClick={handleDeleteClusterDraft}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ClusterUpdateNotification;
