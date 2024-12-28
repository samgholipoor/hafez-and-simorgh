import React from 'react';
import DevicesManagementHeader from './DevicesManagementHeader.jsx';
import DevicesManagementBody from './DevicesManagementBody.jsx';

function DevicesManagement({ onClose }) {
  return (
    <div className="flex flex-col gap-2" style={{ width: '600px' }}>
      <DevicesManagementHeader onClose={onClose} />
      <DevicesManagementBody />
    </div>
  );
}

export default DevicesManagement;
