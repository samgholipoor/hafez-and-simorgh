import React from 'react';
import { Icon } from '@burna/monster-design-system';

function DevicesManagementHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between gap-2 bg-indigo-100 h-16 rounded-t-lg p-4">
      <div className="flex items-center gap-2">
        <Icon type="credit-card" className="block w-6 h-6 bg-gray-600" />
        <span>Management Devices</span>
      </div>

      <div className="cursor-pointer" onClick={onClose}>
        <Icon
          type="x-circle"
          className="block w-5 h-5 bg-gray-600 transition-all duration-300"
        />
      </div>
    </div>
  );
}

export default DevicesManagementHeader;
