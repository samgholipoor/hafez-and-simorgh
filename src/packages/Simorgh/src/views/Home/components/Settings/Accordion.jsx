import { mergeClassNames } from '@/utils/classname';
import { Icon } from '@burna/monster-design-system';
import { useState } from 'react';

function Accordion({ title, children, onClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="overflow-hidden border rounded cursor-pointer h-auto">
      <div
        onClick={onClick ? () => onClick() : () => handleToggle()}
        className="flex justify-between items-center gap-4 bg-[#F9FAFB] px-6 py-2 rounded-t-lg"
      >
        <span className="text-gray-800 text-base select-none">{title}</span>
        {!onClick ? (
          <Icon
            type={isOpen ? 'chevron-up' : 'chevron-down'}
            className={mergeClassNames(
              'block w-6 h-6 bg-gray-800 transition-all duration-300',
              {
                'transform -rotate-180': isOpen,
              },
            )}
          />
        ) : (
          <Icon
            type="settings"
            className={mergeClassNames(
              'block w-5 h-5 bg-gray-800 transition-all duration-300',
              {
                'transform -rotate-180': isOpen,
              },
            )}
          />
        )}
      </div>

      <div
        className={mergeClassNames('transition-all', {
          'h-auto': isOpen,
          'h-0': !isOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export default Accordion;
