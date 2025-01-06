/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {Icon} from '@burna/monster-design-system';
import Box from '@/components/Box';
import CheckboxDropdown from '@/components/form/CheckboxDropdown';
import {useClusterSelection} from '@/services/clusterSelectionProvider.jsx';
import {useCallback} from 'react';
import SuspenseFallback from '@/components/SuspenseFallback';
import EmptyFallback from '@/components/EmptyFallback';
import {mergeClassNames} from '@/utils/classname';
import {useApp} from '@/services/appProvider.jsx';

export default function Navbar() {
  const {
    products,
    isLoadingProducts,
    isLoadingDevices,
    handleHardRefreshDevices,
    handleHardRefreshProducts,
  } = useApp();

  const {handleSelectProducts, handleSelectCluster} = useClusterSelection();

  const invalidateDevicesAndProducts = () => {
    handleHardRefreshDevices();
    handleHardRefreshProducts();
  };

  const render = useCallback(() => {
    if (isLoadingProducts) {
      return (
        <div className="h-full flex items-center justify-center">
          <SuspenseFallback />
        </div>
      );
    }

    if (products && products?.length > 0) {
      return (
        <div className="flex flex-row flex-nowrap gap-2 whitespace-nowrap p-2">
          {products.map((product) => (
            <CheckboxDropdown
              key={product.product_name}
              label={product.product_name}
              options={product.clusters.map((cluster) => ({
                label: cluster.name,
                value: cluster.id,
              }))}
              onCheck={() => handleSelectProducts(product.product_name)}
              onOptionSelect={handleSelectCluster}
            />
          ))}
          <CheckboxDropdown
            label="Empty"
            onCheck={() => handleSelectProducts('Empty')}
          />
        </div>
      );
    }

    return <EmptyFallback />;
  }, [products, isLoadingProducts]);

  return (
    <Box>
      <div className="bg-base-100 bg-opacity-50 shadow-inner w-full px-4">
        <section
          className="flex items-center justify-between gap-4 px-8"
          style={{height: '72px'}}
        >
          <div className="w-32">
            <img
              src="/apps/Simorgh/assets/images/logo.png"
              alt="simorgh-logo"
            />
          </div>

          {render()}

          <div className="w-32 flex justify-end">
            <button
              className="w-10 h-10 bg-primary p-2 rounded cursor-pointer flex items-center justify-center"
              onClick={invalidateDevicesAndProducts}
              disabled={isLoadingProducts || isLoadingDevices}
            >
              <Icon
                type="refresh-cw"
                className={mergeClassNames(
                  'block w-5 h-5 bg-white transition-all duration-300',
                  {
                    'animate-spin': isLoadingProducts || isLoadingDevices,
                  },
                )}
              />
            </button>
          </div>
        </section>
      </div>
    </Box>
  );
}
