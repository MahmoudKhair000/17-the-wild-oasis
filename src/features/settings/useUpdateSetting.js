import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// 3rd-party lobrary imports
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const {
    isLoading: isUpdating,
    mutate: updateSetting
  } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      queryClient.setQueryData(['modals'], { closeModal: true });
      toast.success('Settings Successfully Edited!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateSetting }
}

export default useUpdateSetting;


