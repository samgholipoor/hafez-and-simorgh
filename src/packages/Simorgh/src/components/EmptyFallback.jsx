import { Icon } from '@burna/monster-design-system';

const EmptyFallback = ({ message = 'There is no data' }) => (
  <div className="flex justify-center items-center gap-1 p-4 text-sm md:text-lg">
    <div className="w-fit flex items-center gap-2">
      <p>{message}</p>
      <Icon type="alert-triangle" className="block w-6 h-6 bg-yellow-600" />
    </div>
  </div>
);

export default EmptyFallback;
