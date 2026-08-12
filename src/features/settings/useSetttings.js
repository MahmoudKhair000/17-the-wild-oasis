import { useQuery } from "@tanstack/react-query"
import { getSettings } from "../../services/apiSettings";

function useSetttings() {

  const {
    isLoading: isReading,
    error,
    data: settings
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  return { isReading, error, settings }
}

export default useSetttings;
