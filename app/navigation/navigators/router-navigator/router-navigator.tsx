import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from 'app/navigation/route-names';
import {PoiScreen, Wizard} from 'app/screens';
import {useAppPermissions} from 'app/hooks';

const Stack = createNativeStackNavigator();

export const RouterNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.POI_SCREEN} component={PoiScreen} />
    </Stack.Navigator>
  );
};
