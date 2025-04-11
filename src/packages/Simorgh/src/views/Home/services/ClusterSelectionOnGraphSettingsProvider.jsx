import { createContext, useContext, useMemo, useState } from 'react';

export const clusterSelectionOnGraphSettingsContext = createContext({
  selectedClusterOnGraphSettings: null,
  selectedConfiguration: null,
  handleSelectClusterOnGraphSettings: () => {},
  handleSelectedConfiguration: () => {},
});

export function ClusterSelectionOnGraphSettingsProvider({ children }) {
  const [selectedClusterOnGraphSettings, setSelectedClusterOnGraphSettings] =
    useState(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState(null);

  const contextProviderValue = useMemo(
    () => ({
      selectedClusterOnGraphSettings,
      handleSelectClusterOnGraphSettings: setSelectedClusterOnGraphSettings,
      selectedConfiguration,
      handleSelectedConfiguration: setSelectedConfiguration,
    }),
    [
      selectedClusterOnGraphSettings,
      selectedConfiguration,
      setSelectedClusterOnGraphSettings,
      setSelectedConfiguration,
    ],
  );

  return (
    <clusterSelectionOnGraphSettingsContext.Provider value={contextProviderValue}>
      {children}
    </clusterSelectionOnGraphSettingsContext.Provider>
  );
}

export const useClusterSelectionOnGraphSettings = () => {
  const clusterSelectionOnGraphSettings = useContext(
    clusterSelectionOnGraphSettingsContext,
  );
  if (!clusterSelectionOnGraphSettings) {
    throw new Error('useContext doesnt use in its provider');
  }

  return clusterSelectionOnGraphSettings;
};
