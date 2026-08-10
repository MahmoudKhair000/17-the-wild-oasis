// 3rd-party lobrary imports
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// services & utilities imports
import { createCabin } from '../../services/apiCabins';
import { formatCurrency } from '../../utils/helpers';
// UI imports
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;

	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createCabinMutate } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
			toast.success('Canin Successfully Created!');
			reset();
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	function onSubmit(data) {
		createCabinMutate(data);
	}

	// function onError(errors) {
	// 	console.log(errors);
	// }

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label={'Cabin Name'}
				error={errors?.name}>
				<Input
					type="text"
					disabled={isCreating}
					id="name"
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow
				label={'Max Capacity'}
				error={errors?.maxCapacity}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isCreating}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label={'Regular Price'}
				error={errors?.regularPrice}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isCreating}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 150,
							message: `Price should be at least ${formatCurrency(150)}`,
						},
					})}
				/>
			</FormRow>

			<FormRow
				label={'Discount'}
				error={errors?.discount}>
				<Input
					type="number"
					id="discount"
					disabled={isCreating}
					defaultValue={0}
					{...register('discount', {
						required: 'This field is required',
						min: {
							value: 20,
							message: `Discount should be at least ${formatCurrency(20)}`,
						},
						validate: (value) =>
							Number(value) < Number(getValues().regularPrice) ||
							'discount should be less than the regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label={'Description'}
				error={errors?.description}>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					disabled={isCreating}
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow
				label={'Cabin photo'}
				error={errors?.image}>
				<FileInput
					id="image"
					accept="image/*"
					disabled={isCreating}
					{...register('image')}
				/>
			</FormRow>

			<FormRow>
				<Button
					variation="secondary"
					disabled={isCreating}
					//type:"reset" is a regular html attribute
					type="reset">
					Cancel
				</Button>
				<Button
					disabled={isCreating}
					//type:"submit" is the default
					type="submit">
					Add cabin
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
