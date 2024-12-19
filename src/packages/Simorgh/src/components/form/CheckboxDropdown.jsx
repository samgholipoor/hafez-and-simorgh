/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import { Icon, Checkbox } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname';

function CheckboxDropdown({
  label = '',
  options = [],
  onCheck = () => {},
  onOptionSelect,
}) {
  const [checked, setChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option) => {
    onOptionSelect?.(option);
  };

  const handleCheck = (c) => {
    onCheck(c);
    setChecked(c);
  };

  const containerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative select-none ">
      <div
        className={mergeClassNames('border border-gray-300 px-4 py-2 rounded-md', {
          'bg-base-300': checked,
          'bg-base-200': !checked,
        })}
        onClick={() => setIsOpen(!isOpen)}
        ref={containerRef}
      >
        <div className="flex items-center gap-2">
          <Checkbox text={label} onChange={handleCheck} checked={checked} />
          {onOptionSelect ? (
            <Icon
              type="chevron-down"
              className={mergeClassNames(
                'w-4 h-4 bg-gray-600 transition-all duration-300',
                {
                  'transform -rotate-180': isOpen,
                },
              )}
            />
          ) : null}
        </div>

        {onOptionSelect && isOpen ? (
          <ul className="absolute left-0 top-9 bg-white shadow-md rounded mt-2 w-full z-10">
            {options.length > 0 ? (
              options.map((option) => (
                <li
                  key={option.value}
                  className="py-3 px-4 hover:bg-base-200 group cursor-pointer"
                  onClick={handleOptionSelect.bind(null, option)}
                >
                  <p className="flex justify-between items-center">
                    {option.label}
                    <Icon
                      type="check"
                      className="w-4 h-4 bg-gray-600 hidden group-hover:block"
                    />
                  </p>
                </li>
              ))
            ) : (
              <div>
                <p className="px-4 py-2 text-center text-gray-400">No Cluster</p>
              </div>
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default CheckboxDropdown;
