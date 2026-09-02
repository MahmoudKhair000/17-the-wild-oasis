import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isLoading: isUpdating,
    error
  } = useMutation(
    {
      mutationFn: ({ password, fullName, avatar }) =>
        updateCurrentUser({ password, fullName, avatar }),
      onSuccess: (data) => {
        toast.success(`User data updated successfully`);
        // queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.setQueryData(['user'], data.user);
      },
      onError: (err) => {
        toast.error('Could not update user \n' + err.message);
      },
    }
  );

  return { updateUser, isUpdating, error };
}