import { mergeClassNames } from '@/utils/classname';
import Spinner from './Spinner.jsx';

const SuspenseFallback = ({ message = 'Loading', className }) => (
  <div
    className={mergeClassNames(
      className,
      'flex justify-center items-center text-sm gap-4 p-4 md:p-6',
    )}
  >
    {message}
    <Spinner className="w-5 h-5" />
  </div>
);

export default SuspenseFallback;
