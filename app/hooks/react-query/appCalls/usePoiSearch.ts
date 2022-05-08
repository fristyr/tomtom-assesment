import {TPoiSearch} from 'app/models';
import {useApiCall} from '../useApiCall';
import {TOMTOM_API_KEY} from '@env';
import {LocationObject} from 'expo-location';

interface IPoiSearchParams {
  search: string;
  enabled: boolean;
  location: LocationObject | null;
}

export const usePoiSearch = (params: IPoiSearchParams) => {
  // Destructure params
  const {search, enabled = false, location} = params;

  const baseUrl = `https://api.tomtom.com/search/2/poiSearch/${search}.json?&key=${TOMTOM_API_KEY}&limit=20&countrySet=nl&radius=5000&relatedPois=all`;

  const returnUrl = () => {
    // If location param exist
    if (location) {
      // Destructure it
      const {
        coords: {latitude, longitude},
      } = location;
      // Return url with coordinates
      return `${baseUrl}&lat=${latitude}&lon=${longitude}`;
    } else {
      // Otherwise just return url
      return `${baseUrl}`;
    }
  };

  return useApiCall<TPoiSearch>({
    link: returnUrl(),
    queryParams: {
      enabled,
    },
  });
};
