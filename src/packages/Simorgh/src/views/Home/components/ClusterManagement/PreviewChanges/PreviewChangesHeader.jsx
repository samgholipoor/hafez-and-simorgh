import { Icon } from '@burna/monster-design-system';

function PreviewChangesHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between bg-indigo-100 h-16 p-4 cursor-pointer rounded-t-lg">
      <div className="flex items-center gap-2">
        <Icon type="monitor" className="block w-6 h-6 bg-gray-600" />
        <span>Preview Changes</span>
      </div>

      <div className="flex gap-4">
        <button onClick={onClose}>
          <Icon
            type="x-circle"
            className="block w-5 h-5 bg-gray-600 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}

export default PreviewChangesHeader;
