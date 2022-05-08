import {ConfigContext, ExpoConfig} from '@expo/config';

// If you want to change app version, please change only this object
// So we no longer need to find version number and code
// To prevent old version/code
const versions = {
  number: '1.0.0',
  code: 1,
  package: 'nl.tomtom.com',
  scheme: 'tomtom-assesment'
};

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'tomtom-assesment',
  icon: './app/assets/images/tomtom/icon.png',
  version: versions.number,
  slug: versions.scheme,
  owner: 'fristyr',
  orientation: 'portrait',
  scheme: versions.scheme,
  jsEngine: 'hermes',
  plugins: ['sentry-expo'],
  ios: {
    bundleIdentifier: versions.package,
    buildNumber: versions.number,
    config: {
      googleMapsApiKey: '',
    },
    supportsTablet: true,
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: versions.package,
    permissions: [
      'LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
      'CAMERA',
      'USE_FINGERPRINT',
      'USE_BIOMETRIC',
      'VIBRATE',
      'READ_PHONE_STATE',
      'com.google.android.c2dm.permission.RECEIVE',
      'com.anddoes.launcher.permission.UPDATE_COUNT',
      'com.majeur.launcher.permission.UPDATE_BADGE',
      'com.google.android.providers.gsf.permission.READ_GSERVICES',
      'com.sonyericsson.home.permission.BROADCAST_BADGE',
      'com.htc.launcher.permission.READ_SETTINGS',
      'com.htc.launcher.permission.UPDATE_SHORTCUT',
      'com.sec.android.provider.badge.permission.READ',
      'com.sec.android.provider.badge.permission.WRITE',
    ],
    config: {
     
    },
    versionCode: versions.code,
    useNextNotificationsApi: true,
  },
  locales: {
    nl: './app/i18n/languages/json/nl.json',
    en: './app/i18n/languages/json/en.json',
  },
  splash: {
    image: './app/assets/images/tomtom/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    enabled: false,
  },
  assetBundlePatterns: ['**/*'],
  privacy: 'unlisted',
  platforms: ['ios', 'android', 'web'],
  web: {
    favicon: './assets/icon.png',
  },
});
