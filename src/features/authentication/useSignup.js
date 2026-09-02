import { useMutation } from "@tanstack/react-query";
import { signup as apiSignup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  // const qu

  const {
    mutate: signup,
    isLoading: isSigningUp,
    error
  } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      apiSignup({ fullName, email, password }),
    onSuccess: (data) => {
      const userName
        = data
          ?.user
          ?.user_metadata
          ?.fullName;

      toast.success(`User ${userName} Signed Up Successfully!`);
    },
    onError: (err) => {
      toast.error('! Error Signing Up: ' + err)
    },
  })

  return { signup, isSigningUp, error };
}