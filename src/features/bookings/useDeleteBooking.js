import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking } from "../../services/apiBookings";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteBookingMutate,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id) => {
      deleteBooking(id)
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ active: true });
      toast.success("Booking has been deleted successfuly");
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.refetchQueries({ queryKey: ['bookings'] });
    },
    onError: (err) => {
      toast.error(err?.message);
      console.error(err.message);
    }
  })

  return { deleteBookingMutate, isDeleting, error };
}

export default useDeleteBooking;
