import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const {
    mutate: checkout,
    isLoading: isCheckingOut,
    error
  } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, { status: 'checked-out' })
    },
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} Checked Out Successfully`);
      queryClient.invalidateQueries({ queryKey: ['bookings', 'booking'] });
      queryClient.refetchQueries({ queryKey: ['booking'] });
      // queryClient.invalidateQueries({ active: true });
      // navigate(`/booking/${data.id}`);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  })

  return { checkout, isCheckingOut, error };
}