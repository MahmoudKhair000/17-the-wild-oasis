import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as apiLogout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isLoading: isLoggingOut,
    error
  } = useMutation({
    mutationFn: () => apiLogout(),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error("Logout failed:", error);
    }
  });

  return { logout, isLoggingOut, error };
}

export { useLogout };
