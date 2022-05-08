import {Screens} from 'app/navigation/route-names';

export type RoutesTypes = {
  [Screens.POI_SCREEN]: undefined;
};

// Declare and extend screen names and params (Props) to make react-native-navigation more typescript friendly
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoutesTypes {}
  }
}
