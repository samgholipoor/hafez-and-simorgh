import { Icon } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname';
import { useMemo, useState } from 'react';
import ClusterNameEdit from './ClusterNameEdit';

const ClusterManagementHeader = ({ onClose, onToggle, isOpen }) => {
  const [isEdit, setIsEdit] = useState(false);

  const icons = useMemo(
    () => [
      {
        type: 'edit',
        onClick: () => setIsEdit(true),
      },
      {
        type: 'info',
        onClick: () => {},
      },
      {
        type: 'rotate-ccw',
        onClick: () => {},
      },
      {
        type: 'x-circle',
        onClick: onClose,
      },
    ],
    [onClose],
  );

  return (
    <div
      onClick={onToggle}
      className={mergeClassNames(
        'flex items-center justify-between bg-indigo-100 h-16 p-4 cursor-pointer',
        {
          'rounded-t-lg': isOpen,
          'rounded-lg': !isOpen,
        },
      )}
    >
      <div className="flex items-center gap-4">
        <Icon
          type="chevron-down"
          className={mergeClassNames(
            'block w-8 h-8 bg-gray-600 transition-all duration-300',
            {
              'transform -rotate-180': isOpen,
            },
          )}
        />

        <ClusterNameEdit isEdit={isEdit} onFinish={() => setIsEdit(false)} />
      </div>

      {!isEdit ? (
        <div className="flex gap-4">
          {icons.map(({ type, onClick }) => (
            <div
              key={type}
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              <Icon
                type={type}
                className="block w-5 h-5 bg-gray-600 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ClusterManagementHeader;
