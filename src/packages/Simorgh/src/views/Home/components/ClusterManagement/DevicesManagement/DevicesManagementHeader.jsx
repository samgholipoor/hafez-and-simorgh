import { Icon } from '@burna/monster-design-system';

function DevicesManagementHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between gap-2 bg-indigo-100 h-16 rounded-t-lg p-4">
      <div className="flex items-center gap-2">
        <Icon type="credit-card" className="block w-6 h-6 bg-gray-600" />
        <span>Management Devices</span>
      </div>

      <div className="cursor-pointer flex gap-4">
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost hover:bg-transparent px-0"
          >
            <Icon
              type="info"
              className="block w-5 h-5 bg-gray-600 transition-all duration-300"
            />
          </div>
          <ul
            tabIndex={0}
            className="flex flex-col dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow"
          >
            <li>
              <div className="bg-opacity-15 py-2">
                <div className="badge badge-success badge-xs" />
                <span className="text-sm text-success"> Keep </span>
              </div>
            </li>
            <li>
              <div className="bg-opacity-15 py-2">
                <div className="badge badge-primary badge-xs" />
                <span className="text-sm text-primary"> Add </span>
              </div>
            </li>
            <li>
              <div className="bg-opacity-15 py-2">
                <div className="badge badge-error badge-xs" />
                <span className="text-sm text-error"> Remove </span>
              </div>
            </li>
            <li>
              <div className="bg-opacity-15 py-2">
                <div className="badge badge-warning badge-xs" />
                <span className="text-sm text-warning"> Weight Changes </span>
              </div>
            </li>
          </ul>
        </div>

        <button type="button" onClick={onClose}>
          <Icon
            type="x-circle"
            className="block w-5 h-5 bg-gray-600 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}

export default DevicesManagementHeader;
