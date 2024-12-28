import { Icon, Button } from '@burna/monster-design-system';

const ClusterUpdateNotification = ({}) => {
  const handleApprove = () => {};
  const handleDelete = () => {};

  return (
    <div className="flex flex-col gap-2 border rounded-lg p-2 bg-gray-50">
      <div className="flex gap-4 items-center">
        <Icon type="alert-triangle" className="block w-5 h-5 bg-yellow-500" />
        <p className="text-yellow-500">7 Config Changes</p>
      </div>
      <p className="text-sm text-gray-600">
        before applying changes to the cluster, the preview of the changes will be shown.
      </p>
      <div className="flex justify-between gap-2 mt-2">
        <Button
          text="Apply"
          className="w-full text-base bg-green-600 hover:!bg-green-700 focus:!bg-green-700 border-none font-sans"
          onClick={handleApprove}
        />
        <Button
          text="Delete"
          className="w-full text-base text-gray-600 border border-gray-600 bg-white hover:!bg-white focus:!bg-white font-sans"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default ClusterUpdateNotification;
