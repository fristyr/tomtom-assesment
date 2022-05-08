import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios'

type MutationTypes<T> = {
  key: string;
  method: string;
  apiData?: T;
  invalidateQuery?: string;
  uniqueDecriber?: number;
  apiLink?: string;
};

export function useApiMutation<T = unknown>() {
  const queryClient = useQueryClient();
  let queryKey: string | (string | number)[] = '';
  let invalidateQueryKey = '';
  let apiMethod = '';
  const mutation = useMutation<any, any, any>(
    (data: MutationTypes<T>) => {
      const {key, method, apiData, invalidateQuery = '', uniqueDecriber, apiLink} = data;

      queryKey = uniqueDecriber ? [key, uniqueDecriber] : key;

      invalidateQueryKey = invalidateQuery;
      apiMethod = method;

      const endpoint = apiLink ? apiLink : key;

      if (method === 'post') return axios.post(endpoint, apiData);
      if (method === 'delete') return axios.delete(endpoint);
      if (method === 'put') return axios.put(endpoint, apiData);
      if (method === 'patch') return axios.patch(endpoint, apiData);

      return axios.post(endpoint, apiData);
    },
    {
      onSuccess: data => {
        if (apiMethod === 'post') {
          const oldData = queryClient.getQueryData(queryKey);
          if(oldData) {
            queryClient.setQueryData(queryKey, () => [...(oldData as any), data]);
          } else {
            queryClient.setQueryData(queryKey, () => [ data]);

          }
          return;
        }
        if (apiMethod === 'delete') {
          queryClient.invalidateQueries(invalidateQueryKey);
          return;
        }
        if (apiMethod === 'put') {
          const oldData = queryClient.getQueryData(invalidateQueryKey) as [];
          const newData = oldData.map((el: any) =>
            el.id === data.data.id ? {...el, ...data} : el,
          );
          queryClient.setQueryData(invalidateQueryKey, newData);
          return;
        }
        if (apiMethod === 'patch') {
          const oldData = queryClient.getQueryData(invalidateQueryKey) as [];
          const newData = oldData.map((el: any) =>
            el.id === data.data.id ? {...el, ...data} : el,
          );
          queryClient.setQueryData(invalidateQueryKey, newData);
          return;
        }
        queryClient.invalidateQueries(queryKey);
      },
    },
  );

  return mutation;
}
