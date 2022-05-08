import React, {FC} from 'react';
import {Box, VStack, Button} from 'native-base';
import {useAppPermissions} from 'app/hooks';
import {delay} from 'app/utils';
import {InfoBlock} from 'app/components';

export const Wizard: FC = () => {
  const {permission: locationPermission, askLocationPermission} = useAppPermissions('location');

  return (
    <Box flex={1}>
      {/* Show initial block if permissions is not granted */}
      <VStack alignItems="center" justifyContent="center" space="4" mx="4" flex={1}>
        <InfoBlock
          title="Oooops... no permissions"
          description="Please grant permission to continue"
          icon="location-sharp"
        />
        <Button w="full" onPress={askLocationPermission}>
          Grant Permission
        </Button>
      </VStack>
    </Box>
  );
};
