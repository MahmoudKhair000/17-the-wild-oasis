import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
// 3rd-party lobrary imports
import { createEditCabin } from '../../services/apiCabins';

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });

      toast.success('Cabin Successfully Created!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin }
}

export default useCreateCabin;


