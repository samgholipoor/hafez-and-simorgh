import { Children, isValidElement, useMemo, useState } from 'react';
import { Icon } from '@burna/monster-design-system';
import { mergeClassNames } from '@/utils/classname.js';

function Footer({ children }) {
  return children;
}

function Container({ children }) {
  return children;
}

function Tabs({ title, tabs, children }) {
  const [tabIndex, setTabIndex] = useState(0);

  const bodyChildren = useMemo(
    () =>
      Children.toArray(children).filter((child, index) => {
        if (child && isValidElement(child)) {
          return child.type === Container && tabIndex === index;
        }
        return false;
      }),
    [children, tabIndex],
  );

  const footerChildren = useMemo(
    () =>
      Children.toArray(children).filter((child) => {
        if (child && isValidElement(child)) {
          return child.type === Footer;
        }
        return false;
      }),
    [children, tabIndex],
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-center text-gray-600 text-sm mb-4">{title}</p>
      <ul className="flex border rounded-lg justify-between divide-x">
        {tabs.map((tab, index) => (
          <li
            className="px-4 py-2 cursor-pointer select-none"
            onClick={() => setTabIndex(index)}
          >
            <div
              className={mergeClassNames('flex items-center justify-center gap-2', {
                'opacity-30': tabIndex !== index,
              })}
            >
              <Icon type={tab.icon} className="w-5 h-5 bg-gray-900" />
              <span className="text-base">{tab.title}</span>
            </div>
          </li>
        ))}
      </ul>

      {bodyChildren?.length ? <div className="mt-4">{bodyChildren}</div> : null}
      {footerChildren?.length ? <div className="mt-6">{footerChildren}</div> : null}
    </div>
  );
}

Tabs.Container = Container;
Tabs.Footer = Footer;

export default Tabs;
