import {NativeModules} from 'react-native';
import {useQuery, UseQueryOptions} from 'react-query';
import {api} from 'app/lib/api';

type UseApiCallProps<T> = {
  link: string;
  uniqueDecriber?: number;
  queryParams?: UseQueryOptions<T>;
};

const {MyNetworkLayerModule} = NativeModules;

export function useApiCall<T = unknown>(props: UseApiCallProps<T>) {
  const {link, uniqueDecriber = '', queryParams} = props;

  const queryKey = uniqueDecriber ? [link, uniqueDecriber] : link;

  return useQuery<T>(
    queryKey,
    async () => {
      // Check if native module with network layer exist, otherwise use axios
      if (MyNetworkLayerModule.get) {
        const customNetworkLayerResponse = await MyNetworkLayerModule.get(link);
        console.log('customNetworkLayerResponse');
        return JSON.parse(customNetworkLayerResponse) as T;
      } else {
        const axiosResponse = await api.get<T>(link);
        console.log('axiosResponse');
        return axiosResponse as unknown as T;
      }
    },
    {
      ...queryParams,
    },
  );
}
