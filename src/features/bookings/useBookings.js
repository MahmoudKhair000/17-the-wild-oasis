import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient()

  // // you can pass an array of filter objects and loop over them
  // : [
  //   { field: 'status', method: 'eq', value: filterValue },
  //   { field: 'totalPrice', method: 'lte', value: 5000 }
  // ];
  // // you can pass the method in the filter object and use it
  // : { field: 'status', method: 'eq', value: filterValue };

  // 1. FILTERING
  const filterValue = searchParams.get('status');
  const filter
    = (!filterValue || filterValue === 'all')
      ? null : { field: 'status', value: filterValue };

  // 2. SORTING
  const [field, direction]
    = (searchParams.get('sort') || 'startDate-desc')
      .split('-');
  const sortBy = { field, direction };

  // 3. Pagination
  const page = Number(searchParams.get('page')) || 1;

  // QUERY FETCH
  const {
    data: { data: bookings, count } = {},
    error,
    isLoading
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
    // After the first variable, it acts like a dependency array
    // , Once it changes the query will refetch
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    })
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    })

  return { bookings, count, isLoading, error };
}

export default useBookings;
