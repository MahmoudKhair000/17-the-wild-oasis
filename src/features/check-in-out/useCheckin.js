import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const {
    mutate: checkin,
    isLoading: isCheckingIn,
    error
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => {
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: () => {
      toast.success(`Booking #${bookingId} Checked In Successfully`);
      queryClient.invalidateQueries({ queryKey: ['bookings', 'booking'] });
      queryClient.refetchQueries({ queryKey: ['booking'] });
      // queryClient.invalidateQueries({ active: true });
      navigate(`/booking/${bookingId}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  })

  return { checkin, isCheckingIn, error };
}