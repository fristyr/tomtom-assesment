import {ITheme} from 'app/theme/native-base/extended-theme';

// Making the custom theme typing available
declare module 'native-base' {
  interface ICustomTheme extends ITheme {}
}
