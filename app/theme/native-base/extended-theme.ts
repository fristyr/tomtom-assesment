import {extendTheme} from 'native-base';
import {buttonBaseStyle, textBaseStyle, headingBaseStyle} from './components-style';
import {fontConfig, fonts} from './font-config';
import {shadows} from './shadows';

const theme = extendTheme({
  fontConfig,
  fonts,
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'light',
  },
  components: {
    Button: buttonBaseStyle,
    Text: textBaseStyle,
    Heading: headingBaseStyle,
  },
  shadows,
});

export type ITheme = typeof theme;

export default theme;
