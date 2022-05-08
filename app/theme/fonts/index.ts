import * as Font from 'expo-font';

export const initFonts = async () => {
  await Font.loadAsync({
    bilo: require('../../assets/fonts/tomtom-assesment/Bilo.ttf'),
    interstate: require('../../assets/fonts/tomtom-assesment/Interstate.ttf'),
    'source-sans-pro-light': require('../../assets/fonts/tomtom-assesment/SourceSansPro-Light.ttf'),
    'source-sans-pro-light-italic': require('../../assets/fonts/tomtom-assesment/SourceSansPro-LightItalic.ttf'),
    'source-sans-pro-regular': require('../../assets/fonts/tomtom-assesment/SourceSansPro-Regular.ttf'),
    'source-sans-pro-semibold': require('../../assets/fonts/tomtom-assesment/SourceSansPro-Semibold.ttf'),
  });
};
