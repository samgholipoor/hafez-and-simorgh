import { makeAssetsUrl } from '@/utils/assetsUrl.js';

function ResultStatus({ status, description, onClose }) {
  const imgSrc = {
    success: makeAssetsUrl('/assets/images/success.png'),
    error: makeAssetsUrl('/assets/images/error.png'),
  };

  const text = {
    success: 'Done',
    error: 'An error has occurred',
  };

  const fallbackDescription = {
    success: 'All changes are applied successfully!',
    error: 'There were some failures in applying the changes!',
  };

  return (
    <div className="w-screen h-screen fixed left-0 top-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
      <div className="flex flex-col gap-2 bg-white items-center p-6 rounded-lg w-96">
        <div className=" ">
          <img src={imgSrc[status]} alt={status} className="w-14" />
        </div>
        <h2 className={`text-lg text-${status}`}>{text[status]}</h2>
        <p className="text-sm font-light text-gray-600">
          {description || fallbackDescription[status]}
        </p>
        <button className="btn btn-sm px-6 mt-4" onClick={onClose}>
          ok
        </button>
      </div>
    </div>
  );
}

export default ResultStatus;
