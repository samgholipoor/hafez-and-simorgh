/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {useCallback, useState} from 'react';
import {Icon} from '@burna/monster-design-system';
import Box from '@/components/Box';
import CheckboxDropdown from '@/components/form/CheckboxDropdown';
import {useProductClustersSelection} from '@/services/productClustersSelectionProvider.jsx';
import {useClusterSelection} from '@/services/clusterSelectionProvider.jsx';
import SuspenseFallback from '@/components/SuspenseFallback';
import EmptyFallback from '@/components/EmptyFallback';
import {mergeClassNames} from '@/utils/classname';
import {useApp} from '@/services/appProvider.jsx';
import DropDown from '@/components/DropDown.jsx';
import {makeAssetsUrl} from '@/utils/assetsUrl.js';
import ErrorsNotificationDialog from './ErrorsNotificationDialog.jsx';

export default function Navbar() {
  const [openErrorsDialog, setOpenErrorDialog] = useState(false);
  const {deviceErrorsText, products, isLoading, handleHardRefresh} = useApp();

  const {handleSelectProductsClusters, handleSelectProductsClustersAll} =
    useProductClustersSelection();
  const {handleSelectCluster} = useClusterSelection();

  const invalidateDevicesAndProducts = () => {
    handleHardRefresh();
  };

  const render = useCallback(() => {
    if (isLoading) {
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
              onItemsSelect={handleSelectProductsClusters}
              onItemsSelectAll={handleSelectProductsClustersAll}
              onItemClick={handleSelectCluster}
            />
          ))}
        </div>
      );
    }

    return <EmptyFallback />;
  }, [products, isLoading]);

  return (
    <>
      <Box>
        <div className="bg-base-100 bg-opacity-50 shadow-inner w-full px-4">
          <section
            className="flex items-center justify-between gap-4 px-8"
            style={{height: '72px'}}
          >
            <div className="w-32">
              <img
                src={makeAssetsUrl('/assets/images/logo.png')}
                alt="simorgh-logo"
              />
            </div>

            {render()}

            <div className=" flex justify-end gap-4 ">
              <DropDown
                initialValue={{
                  label: 'Services',
                  value: 'services',
                  icon: 'grid',
                }}
                options={[
                  {label: 'Services', value: 'services', icon: 'grid'},
                  {
                    label: 'Size',
                    value: 'size',
                    icon: 'maximize-2',
                    disabled: true,
                  },
                  {
                    label: 'Hostname:IP',
                    value: 'hostname',
                    icon: 'tag',
                    disabled: true,
                  },
                  {
                    label: 'Errors',
                    value: 'errors',
                    icon: 'alert-circle',
                    disabled: true,
                  },
                ]}
              />

              <div className="flex gap-2">
                <button
                  className="w-10 h-10 bg-primary p-2 rounded cursor-pointer flex items-center justify-center"
                  onClick={invalidateDevicesAndProducts}
                  disabled={isLoading}
                >
                  <Icon
                    type="refresh-cw"
                    className={mergeClassNames(
                      'block w-5 h-5 bg-white transition-all duration-300',
                      {
                        'animate-spin': isLoading,
                      },
                    )}
                  />
                </button>
                <button
                  className="relative w-10 h-10 bg-gray-200 p-2 rounded cursor-pointer flex items-center justify-center"
                  onClick={() => setOpenErrorDialog((prev) => !prev)}
                >
                  <div>
                    <Icon
                      type="bell"
                      className="block w-6 h-6 bg-black transition-all duration-300"
                    />
                    {deviceErrorsText.length > 0 ? (
                      <span className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-error text-xs text-white rounded-full w-4 h-4">
                        {deviceErrorsText.length}
                      </span>
                    ) : null}
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </Box>

      {openErrorsDialog ? (
        <div
          className="z-50 fixed right-6 bg-white rounded-lg p-4 pb-6 overflow-auto select-text shadow-sm"
          style={{width: '480px', maxHeight: '380px', top: '110px'}}
        >
          <ErrorsNotificationDialog onClose={() => setOpenErrorDialog(false)} />
        </div>
      ) : null}
    </>
  );
}
