import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getToday } from '../../utils/helpers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const queryDate = subDays(getToday({ end: true }), numDays).toISOString();

  // console.log(queryDate);
  const { isLoading, data: bookingsData } = useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  // // PreFetching...

  // if (numDays == 7) {
  //   queryClient.prefetchQuery({
  //     queryKey: ['bookings', `last-${30}`],
  //     queryFn: () => getBookingsAfterDate(queryDate),
  //   });
  // }

  // if (numDays == 30) {
  //   queryClient.prefetchQuery({
  //     queryKey: ['bookings', `last-${90}`],
  //     queryFn: () => getBookingsAfterDate(queryDate),
  //   });
  // }

  return { isLoading, bookingsData };
}
