import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// 3rd-party lobrary imports
import { createEditCabin } from '../../services/apiCabins';

function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabin, id }) => {
      createEditCabin(cabin, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      queryClient.setQueryData(['modals'], { closeModal: true });
      toast.success('Cabin Successfully Edited!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editCabin }
}

export default useEditCabin


