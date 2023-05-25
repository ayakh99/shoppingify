import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useItem = (itemId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    itemId ? `/api/items/${itemId}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useItem;
