import React, { FC } from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './app/i18n';
import Routes from './app/Navigations/Routes';
import useAppStore, { hydratedSelector } from './app/store/appStore';

const App: FC = () => {
  const isStoreHydrated = useAppStore(hydratedSelector);

  if (!isStoreHydrated) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Routes />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default App;
