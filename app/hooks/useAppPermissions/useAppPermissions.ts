import React from 'react';
import {useForegroundPermissions} from 'expo-location';
import {Alert} from 'react-native';
import {openSettings} from 'expo-linking';
import {Camera} from 'expo-camera';

export const useAppPermissions = (type?: 'camera' | 'location') => {
  const [status, requestPermission] = useForegroundPermissions();
  const [permission, setPermission] = React.useState<boolean>(false);

  const askLocationPermission = async () => {
    const {status} = await requestPermission();
    if (status === 'granted') {
      setPermission(true);
    } else {
      setPermission(false);
      Alert.alert('No permissions', 'Need permissions', [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {text: 'OK', onPress: () => openSettings()},
      ]);
    }
  };

  const askCameraPermission = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setPermission(true);
    } else {
      setPermission(false);
      Alert.alert('No permissions', 'Need permissions', [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {text: 'OK', onPress: () => openSettings()},
      ]);
    }
  };

  const initialPermissions = async () => {
    if (type && type === 'location' && status) {
      setPermission(status.granted);
    }
    if (type && type === 'camera') {
      const cameraPermission = await Camera.getCameraPermissionsAsync();
      setPermission(cameraPermission.granted);
    }
  };

  React.useEffect(() => {
    initialPermissions();
  }, [status]);

  return {
    permission,
    askLocationPermission,
    askCameraPermission,
  };
};
