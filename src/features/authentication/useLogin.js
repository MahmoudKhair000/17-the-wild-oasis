import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as apiLogin } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    mutate: login,
    isLoading: isLoggingIn,
    error
  } = useMutation({
    mutationFn: ({ email, password }) =>
      apiLogin({ email, password }),

    onSuccess: (user) => {
      // console.log(user?.user_metadata);
      toast.success('User Logged In Succesfully');
      queryClient.setQueryData(['user'], user);
      navigate('/dashboard', { replace: true });
    },

    onError: (err) => {
      console.error(err)
      toast.error(
        'Could not Log In User Succesfully\n'
        + err.message
      );
    }
  });

  return { login, isLoggingIn, error };
}