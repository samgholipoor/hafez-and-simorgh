import useClickOutside from '@/hooks/useClickOutside.js';
import { mergeClassNames } from '@/utils/classname.js';
import { Icon } from '@burna/monster-design-system';
import { useRef, useState } from 'react';

export default function DropDown({ initialValue, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);

  const containerRef = useRef(null);
  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleSelect(option) {
    onSelect?.(option);
    setSelectedOption(option);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="w-52 border border-gray-300 py-2 px-4 rounded-md"
        onClick={handleToggle}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon type={selectedOption.icon} className="w-5 h-5 bg-gray-500" />
            <span className="text-gray-500">{selectedOption.label}</span>
          </div>
          <Icon
            type="chevron-down"
            className={mergeClassNames('w-5 h-5 bg-gray-600', {
              'transform -rotate-180': !isOpen,
            })}
          />
        </div>
      </button>
      {isOpen ? (
        <ul className="w-52 absolute left-0 top-12 menu bg-white rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => (option.disabled ? () => {} : handleSelect(option))}
            >
              <span
                className={mergeClassNames(
                  'text-gray-500 flex items-center gap-2 active:bg-opacity-30',
                  {
                    'bg-primary bg-opacity-20': selectedOption.value === option.value,
                  },
                  {
                    'cursor-not-allowed opacity-40 hover:bg-opacity-0 active:bg-opacity-0':
                      option.disabled,
                  },
                )}
              >
                <Icon type={option.icon} className="w-5 h-5 bg-gray-500" />
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
