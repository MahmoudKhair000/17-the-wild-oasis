import { useQuery } from "@tanstack/react-query"
import { getSettings } from "../../services/apiSettings";

export function useSettings() {

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


