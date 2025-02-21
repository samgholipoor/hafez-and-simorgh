import { mergeClassNames } from '@/utils/classname.js';
import { Icon } from '@burna/monster-design-system';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

function StdoutResult({ content, onClose, finished = false }) {
  const [isMinimize, setIsMinimize] = useState(true);

  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [content]);

  const handleToggleWindowSize = () => {
    setIsMinimize((prev) => !prev);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast('Content is copied', { type: 'success' });
    } catch (err) {
      toast('Something went wrong', { type: 'error' });
    }
  };

  return (
    <div className="w-screen h-screen fixed left-0 top-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
      <div
        className={mergeClassNames('flex flex-col bg-white items-center rounded-lg', {
          'w-10/12 h-3/4': isMinimize,
          'w-full h-full': !isMinimize,
        })}
      >
        <div className="w-full py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon
              type="loader"
              className="block w-4 h-4 bg-gray-600 transition-all duration-300"
            />
            <span>progress</span>
          </div>
          <div className="flex gap-4">
            <div className="tooltip tooltip-bottom" data-tip="Copy">
              <button onClick={copyToClipboard}>
                <Icon
                  type="copy"
                  className="block w-5 h-5 bg-gray-600 transition-all duration-300"
                />
              </button>
            </div>

            <div
              className="tooltip tooltip-bottom"
              data-tip={isMinimize ? 'Maximize' : 'Minimize'}
            >
              <button onClick={handleToggleWindowSize}>
                <Icon
                  type={isMinimize ? 'maximize-2' : 'minimize-2'}
                  className="block w-5 h-5 bg-gray-600 transition-all duration-300"
                />
              </button>
            </div>

            <div className="tooltip tooltip-bottom" data-tip="Close">
              <button onClick={onClose}>
                <Icon
                  type="x-circle"
                  className="block w-5 h-5 bg-gray-600 transition-all duration-300"
                />
              </button>
            </div>
          </div>
        </div>
        <div ref={consoleRef} className="w-full h-full bg-gray-800 overflow-auto">
          <div className="text-white px-6 py-4">
            {content ? <pre className="whitespace-break-spaces">{content}</pre> : null}
            {finished ? (
              <>
                <pre>------------------------------------------</pre>
                <pre>Finished.</pre>
              </>
            ) : (
              <pre>...</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StdoutResult;
