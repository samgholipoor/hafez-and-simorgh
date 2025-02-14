/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from 'react';
import { Icon, Checkbox } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname';

function CheckboxItem({ label, value, onChange, openCluster }) {
  return (
    <li className="py-3 px-4 group cursor-pointer">
      <div className="flex justify-between items-center">
        <Checkbox text={label} onChange={onChange} checked={value} />
        {openCluster ? (
          <div onClick={openCluster} className="flex">
            <Icon type="grid" className="w-4 h-4 bg-gray-600" />
          </div>
        ) : null}
      </div>
    </li>
  );
}

function CheckboxDropdown({
  label = '',
  options = [],
  onItemsSelect = () => {},
  onItemsSelectAll = () => {},
  onItemClick,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectAll = (value) => {
    let result = [];
    if (value) {
      result = options.map((option) => option.value);
    }

    setSelectedItems(result);
    onItemsSelectAll(
      options.map((option) => option.value),
      value,
    );
  };

  const handleChange = (value) => {
    const index = selectedItems.findIndex((e) => e === value);
    let result = [...selectedItems];

    if (index === -1) {
      result.push(value);
    } else {
      result = [...result.slice(0, index), ...result.slice(index + 1)];
    }

    setSelectedItems(result);
    onItemsSelect([value]);
  };

  const containerRef = useRef(null);
  const handleClickOutside = (event) => {
    if (!containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative select-none">
      <div
        className="w-40 border border-gray-300 px-4 py-2 rounded-md  cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        ref={containerRef}
      >
        <div className="flex justify-between items-center gap-2">
          <span className="text-gray-600">{label}</span>
          <Icon
            type="chevron-down"
            className={mergeClassNames(
              'w-4 h-4 bg-gray-600 transition-all duration-300',
              {
                'transform -rotate-180': isOpen,
              },
            )}
          />
        </div>

        {onItemClick && isOpen ? (
          <ul
            className="absolute left-0 top-9 bg-white shadow-md rounded mt-2 w-full z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {options.length > 0 ? (
              <>
                <CheckboxItem
                  label="all"
                  onChange={handleSelectAll}
                  value={selectedItems?.length === options.length}
                />
                {options.map((option) => (
                  <CheckboxItem
                    key={option.value}
                    label={option.label}
                    onChange={() => handleChange(option.value)}
                    value={selectedItems?.includes(option.value)}
                    openCluster={() => {
                      onItemClick(option);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </>
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
