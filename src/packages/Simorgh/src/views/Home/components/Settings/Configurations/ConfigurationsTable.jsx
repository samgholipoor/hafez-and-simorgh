import { mergeClassNames } from '@/utils/classname.js';
import { Children, isValidElement, useMemo } from 'react';

function TableField({ tag = 'td', children, className, ...props }) {
  const Tag = tag;

  return (
    <Tag
      className={mergeClassNames(
        'text-center text-sm border-l border-b border-white whitespace-nowrap px-4 py-2',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

function TableRow({ type = 'body', className, children, ...props }) {
  const fieldTag = type === 'header' ? 'th' : 'td';

  const fieldChildren = useMemo(
    () =>
      Children.toArray(children)
        .filter((child) => {
          if (child && isValidElement(child)) {
            return child.type === TableField;
          }
          return false;
        })
        .map((child) => {
          if (child && isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                tag: fieldTag,
              },
            };
          }
          return false;
        }),
    [children],
  );

  return (
    <tr
      className={mergeClassNames(
        {
          'bg-[#E4E5E8]': type === 'body',
          'bg-[#253364] text-white': type === 'header',
        },
        className,
      )}
      {...props}
    >
      {fieldChildren}
    </tr>
  );
}

function ConfigurationsTable({ header, className, children, ...props }) {
  const headerChildren = useMemo(
    () =>
      Children.toArray(children).filter((child) => {
        if (child && isValidElement(child)) {
          return child.type === TableRow && child.props.type === 'header';
        }
        return false;
      }),
    [children],
  );

  const bodyChildren = useMemo(
    () =>
      Children.toArray(children).filter((child) => {
        if (child && isValidElement(child)) {
          return child.props.type !== 'header';
        }
        return false;
      }),
    [children],
  );

  return (
    <div className="flex flex-col items-center gap-4 w-full relative">
      <div className="w-full">
        {header && typeof header === 'string' ? (
          <div className="text-center font-bold p-4 border-b border-gray-400">
            {header}
          </div>
        ) : (
          header
        )}
        <div className="overflow-auto relative">
          <table
            className={mergeClassNames(
              'overflow-auto w-full text-base-content',
              className,
            )}
            {...props}
          >
            {headerChildren.length > 0 ? <thead>{headerChildren}</thead> : null}
            {bodyChildren?.length ? (
              <tbody className="table-body-container divide-y relative">
                {bodyChildren}
              </tbody>
            ) : null}
          </table>

          {!(bodyChildren?.length > 0) ? (
            <div className="p-4 border border-base-300">
              <div className="flex justify-center items-center gap-1 px-4">
                <div className="w-fit flex items-center gap-2">
                  <span>There is no data</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

ConfigurationsTable.Row = TableRow;
ConfigurationsTable.Field = TableField;

export default ConfigurationsTable;
