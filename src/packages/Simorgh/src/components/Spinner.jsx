import { mergeClassNames } from '@/utils/classname';

function Spinner({ className }) {
  return (
    <div
      className={mergeClassNames(
        'rounded-full border-4 border-white border-t-primary border-l-gray-50 border-r-gray-50 border-b-gray-50 cursor-wait animate-spin',
        className,
      )}
    />
  );
}

export default Spinner;
