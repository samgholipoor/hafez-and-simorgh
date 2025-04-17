import { Icon } from '@burna/monster-design-system';
import { useApp } from '@/services/appProvider.jsx';
import { makeAssetsUrl } from '@/utils/assetsUrl.js';

export default function ErrorsNotificationDialog({ onClose }) {
  const { deviceErrorsText } = useApp();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <Icon
              type="x-circle"
              className="block w-5 h-5 bg-error transition-all duration-300"
            />
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src={makeAssetsUrl('/assets/images/error.png')}
            alt="errors"
            className="w-12"
          />
        </div>
      </div>
      <div className="text-error">
        {deviceErrorsText.length > 0 ? (
          <p>
            <strong>Errors</strong>{' '}
            <span className="text-sm">
              ({deviceErrorsText.length} item
              {deviceErrorsText.length > 2 ? 's' : ''})
            </span>
          </p>
        ) : (
          <p>There is no error</p>
        )}
      </div>
      {deviceErrorsText.length > 0 ? (
        <ul className="flex flex-col items-start gap-2 list-disc list-inside">
          {deviceErrorsText.map((deviceErrorText) => (
            <li className="bg-error bg-opacity-10 p-4 rounded-lg w-full text-left">
              <strong>{deviceErrorText.host}</strong>: {deviceErrorText.text}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
