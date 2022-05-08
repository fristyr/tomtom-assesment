import React from 'react';
import useCachedResources from 'app/hooks/useCachedResources/useCachedResources';
import {QueryClientProvider, setLogger} from 'react-query';
import {LocalizationContext} from 'app/contexts';
import {Router} from 'app/navigation/router';
import {queryClient, useLocalization, useOnlineManager} from './hooks';
import {Box, NativeBaseProvider} from 'native-base';
import theme from 'app/theme/native-base/extended-theme';
import AppLoading from 'expo-app-loading';
import {ReactQueryDevtools} from 'react-query/devtools';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';

// Set React-Query loger for react native
setLogger({
  log: console.log,
  warn: console.log,
  error: console.log,
});

LogBox.ignoreLogs(['Setting a timer']);

// Native base linear gradient config
const config = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
};

export default function App() {
  // Global state

  // Localization context to change language and use translation strings
  const localization = useLocalization();

  // Load cached resources on app starts (fonts, images etc.)
  const {isLoadingComplete, loadResourcesAndDataAsync, onFinishLoad, onError} =
    useCachedResources();

  // This hook will refetch all queries when user came after background state
  /* useAppState({
    onChange: onAppStateChange,
  }); */

  // This hook will refetch queries after user reconects to the internet
  useOnlineManager();

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAndDataAsync}
        onFinish={onFinishLoad}
        onError={onError}
      />
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NativeBaseProvider theme={theme} config={config}>
            <Box bg="white" flex={1} overflow="hidden">
              <LocalizationContext.Provider value={localization}>
                <Router />

                <ReactQueryDevtools initialIsOpen={false} />
              </LocalizationContext.Provider>
            </Box>
          </NativeBaseProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    );
  }
}
