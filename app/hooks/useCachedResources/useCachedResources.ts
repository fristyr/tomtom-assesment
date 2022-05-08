import React from 'react';
import {FontAwesome} from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  async function loadResourcesAndDataAsync() {
    try {
      await Font.loadAsync({
        ...FontAwesome.font,
        bilo: require('../../assets/fonts/tomtom-assesment/Bilo.ttf'),
        interstate: require('../../assets/fonts/tomtom-assesment/Interstate.ttf'),
        'source-sans-pro-light': require('../../assets/fonts/tomtom-assesment/SourceSansPro-Light.ttf'),
        'source-sans-pro-light-italic': require('../../assets/fonts/tomtom-assesment/SourceSansPro-LightItalic.ttf'),
        'source-sans-pro-regular': require('../../assets/fonts/tomtom-assesment/SourceSansPro-Regular.ttf'),
        'source-sans-pro-semibold': require('../../assets/fonts/tomtom-assesment/SourceSansPro-Semibold.ttf'),
      });
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      throw e;
    } finally {
      setLoadingComplete(true);
    }
  }

  function onFinishLoad() {
    setLoadingComplete(true);
  }

  function onError() {
    setLoadingComplete(true);
  }

  return {isLoadingComplete, setLoadingComplete, loadResourcesAndDataAsync, onFinishLoad, onError};
}
