import { useState } from 'react';
import ClusterManagementHeader from './ClusterManagementHeader.jsx';
import ClusterManagementBody from './ClusterManagementBody.jsx';

const ClusterManagement = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-24 right-8 flex flex-col gap-2 w-96">
      <ClusterManagementHeader
        onClose={onClose}
        onToggle={handleToggle}
        isOpen={isOpen}
      />

      {isOpen ? <ClusterManagementBody /> : null}
    </div>
  );
};

export default ClusterManagement;
