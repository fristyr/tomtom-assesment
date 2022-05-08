import React from 'react';
import {delay, tcatch} from 'app/utils';
import NetInfo from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import {compareVersion} from 'app/utils/compareVersion';
import {Platform} from 'react-native';
import appConfig from '../../../app.config';

type TAppStatus = 'highest' | 'moderate' | 'updated' | null;
type TDataVersion = {
  current: string;
  minimum: string;
};

function localVersionNumber(): string {
  switch (Platform.OS) {
    case 'ios':
      return Constants.manifest?.version as string;
    case 'android':
      return Constants.manifest?.version as string;
    case 'web':
      return '1.0.0';
    default:
      return Constants.manifest?.version as string;
  }
}

export const useAppVersionStatus = () => {
  const [appVersionStatus, setAppVersionStatus] = React.useState<TAppStatus>(null);

  React.useEffect(() => {
    async function checkAppVersion() {
      await NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          return {
            status: false,
          };
        }
      });
      await delay(1000);

      //const [data, error] = await tcatch(axios.get(env.APP_VERSION_CHECK));
      //if (error) return;

      //const version = data as TDataVersion;

      // dummy data
      const version = {
        minimum: '1.0.0',
        current: '1.0.0',
      };

      const localAppVersion = localVersionNumber();
      const apiMinAppVersion = version.minimum;
      const apiCurrentAppVersion = version.current;

      const highestUpdate = compareVersion(localAppVersion, apiMinAppVersion) === -1;
      const moderateUpdate = compareVersion(localAppVersion, apiCurrentAppVersion) === -1;

      const updated =
        compareVersion(localAppVersion, apiCurrentAppVersion) === 0 ||
        compareVersion(localAppVersion, apiCurrentAppVersion) === 1;

      // If current version of the app is too low and needs to be updated
      // Otherwise do not let user use the app
      if (highestUpdate) {
        setAppVersionStatus('highest');
        return;
      }

      // If there is a new version of the app in store
      // Popup a modal with ask to update
      if (moderateUpdate) {
        setAppVersionStatus('moderate');
        return;
      }

      // If current version of the app is up to date
      if (updated) {
        setAppVersionStatus('updated');
        return;
      }
    }

    checkAppVersion();
  }, []);

  return {appVersionStatus};
};
