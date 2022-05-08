import * as React from 'react';
import {Box, Icon, Input, ScrollView, Spinner, Text, VStack} from 'native-base';
import {useAppPermissions, useDebounce, useInput, usePoiSearch} from 'app/hooks';
import {InfoBlock} from 'app/components';
import Ionicons from '@expo/vector-icons/Ionicons';
import {delay, tcatch} from 'app/utils';
import {useForegroundPermissions, getCurrentPositionAsync, LocationObject} from 'expo-location';

export function PoiScreen() {
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const [currentLocation, setCurrentLocation] = React.useState<LocationObject | null>(null);

  const searchText = useInput('');
  const debouncedSearch = useDebounce(searchText.value, 500);

  const canFetch = debouncedSearch.length > 3;

  const {data: poiData, status} = usePoiSearch({
    search: debouncedSearch,
    enabled: canFetch,
    location: currentLocation,
  });

  React.useEffect(() => {
    const askInitialLocationPermissionsAsync = async () => {
      if (!locationPermission) {
        await delay(500);
        requestPermission();
      }

      if (locationPermission) {
        const [location] = await tcatch<LocationObject>(getCurrentPositionAsync({}));
        if (location) setCurrentLocation(location);
      }
    };
    askInitialLocationPermissionsAsync();
  }, [locationPermission]);

  return (
    <Box flex={1}>
      <VStack mt="6" space="4">
        {/* Users input for poi searching query */}
        <Input
          InputLeftElement={
            <Icon as={<Ionicons name="location-sharp" />} size="lg" ml="2" color="primary.500" />
          }
          placeholder="Enter your location"
          borderColor="primary.500"
          mx="2"
          {...searchText}
        />

        {/* Poi search scroll view with data */}
        <ScrollView>
          <VStack space="4" mb="24" mx="2">
            {status === 'loading' && <Spinner size="lg" />}

            {/* If fore some reason status of fetching is success but data is still undefined | null */}
            {status === 'success' && !poiData && (
              <InfoBlock
                title="Oooops... something went wrong "
                description="Try again"
                icon="close-circle-sharp"
              />
            )}

            {/* If poi search is empty */}
            {status === 'success' && !poiData.results.length && (
              <InfoBlock
                title="Oooops... no results"
                description="Try something else"
                icon="close-circle-sharp"
              />
            )}

            {/* Show poi search list */}
            {status === 'success' &&
              poiData.results.map(({poi, id, dist}) =>
                poi ? (
                  <Box key={id} borderWidth={2} p="2">
                    <Text>{poi.name}</Text>
                    {dist && <Text>{Math.trunc(dist)} Meters from you</Text>}
                  </Box>
                ) : null,
              )}
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
}
