import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useNavigationScreen} from 'app/hooks';
import {RouterNavigator} from './navigators';
import {linkingConfiguration} from './linking-configuration';
import * as Linking from 'expo-linking';
import {ParsedURL} from 'expo-linking';

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};

export function Router() {
  const {navigationRef, onReady, onStateChange} = useNavigationScreen();

  const [deepLinkData, setDeeplinkData] = React.useState<ParsedURL | null>(null);

  const handleDeepLink = (event: any) => {
    const data = Linking.parse(event.url);
    setDeeplinkData(data);
  };

  React.useEffect(() => {
    const getInitialUrl = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) await Linking.openURL(initialURL);
    };

    Linking.addEventListener('url', handleDeepLink);
    if (!deepLinkData) {
      getInitialUrl();
    }
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [deepLinkData]);

  return (
    <NavigationContainer
      theme={navigatorTheme}
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onStateChange}
      linking={linkingConfiguration}
    >
      <RouterNavigator />
    </NavigationContainer>
  );
}
