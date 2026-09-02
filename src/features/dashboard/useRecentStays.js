import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
// import { getToday } from '../../utils/helpers';
import { useQuery } from '@tanstack/react-query';
// import { useQueryClient } from '@tanstack/react-query';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  // const queryClient = useQueryClient();

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const queryDate = subDays(new Date(), numDays).toISOString();

  // console.log(queryDate);
  const { isLoading, data: stays } = useQuery({
    queryKey: ['stays', `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out',
  );

  // // PreFetching...

  // if (numDays == 7) {
  //   queryClient.prefetchQuery({
  //     queryKey: ['stays', `last-${30}`],
  //     queryFn: () => getStaysAfterDate(queryDate),
  //   });

  // } else if (numDays == 30) {
  //   queryClient.prefetchQuery({
  //     queryKey: ['stays', `last-${90}`],
  //     queryFn: () => getStaysAfterDate(queryDate),
  //   });
  // }

  return { isLoading, staysData: confirmedStays, numDays };
}
