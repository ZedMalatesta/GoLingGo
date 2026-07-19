import React, { FC } from 'react';

import { Caveat_700Bold, useFonts } from '@expo-google-fonts/caveat';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './app/i18n';
import Routes from './app/Navigations/Routes';
import useAppStore, { hydratedSelector } from './app/store/appStore';

const App: FC = () => {
  const isStoreHydrated = useAppStore(hydratedSelector);
  const [fontsLoaded] = useFonts({
    Caveat_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!isStoreHydrated || !fontsLoaded) {
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
