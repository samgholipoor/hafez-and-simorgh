import { useRef, useState } from 'react';
import { Icon } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname.js';
import useClickOutside from '@/hooks/useClickOutside.js';

function RowItem({ item }) {
  return (
    <div
      className={mergeClassNames(
        'hover:bg-gray-200 cursor-pointer py-2 px-3 flex justify-between items-center',
      )}
    >
      <div className="flex items-center gap-2">
        {item.icon ? <Icon type={item.icon} className="w-4 h-4 bg-gray-700" /> : null}
        <span className="">{item.title}</span>
      </div>
      {item.children?.length ? (
        <Icon type="chevron-right" className="w-4 h-4 bg-gray-700" />
      ) : null}
    </div>
  );
}

function SubMenu({ items, handleClick }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.value} onClick={() => handleClick(item)}>
          <RowItem item={item} />
        </li>
      ))}
    </ul>
  );
}

function ContextMenu({ items, className, onClose, handleClick, ...props }) {
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const containerRef = useRef(null);
  useClickOutside(containerRef, () => {
    onClose();
  });

  const handleMouseEnter = (menu) => {
    setOpenSubMenu(menu);
  };

  const handleMouseLeave = () => {
    setOpenSubMenu(null);
  };

  const handleClickItem = (item) => {
    handleClick(item);
    onClose();
  };

  return (
    <div
      className={mergeClassNames(className)}
      {...props}
      onContextMenu={(e) => e.preventDefault()}
      ref={containerRef}
    >
      <div className="bg-white rounded shadow-lg w-40">
        <ul>
          {items.map((item) => (
            <li
              key={item.value}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.value)}
              onMouseLeave={handleMouseLeave}
              onClick={item.children ? () => {} : () => handleClickItem(item)}
            >
              <RowItem item={item} />

              {item.children?.length ? (
                <div
                  className="absolute left-full top-0 bg-white rounded shadow-lg w-40 mt-1"
                  onMouseEnter={() => handleMouseEnter(item.value)}
                  onMouseLeave={handleMouseLeave}
                >
                  {openSubMenu === item.value && (
                    <SubMenu items={item.children} handleClick={handleClickItem} />
                  )}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContextMenu;
