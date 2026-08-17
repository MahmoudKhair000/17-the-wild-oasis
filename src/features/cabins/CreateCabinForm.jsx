// Imports
import { useForm } from 'react-hook-form';
// 3rd-party lobrary imports
import useCreateCabin from './useCreateCabin';
import useEditCabin from './useEditCabin';
import { formatCurrency } from '../../utils/helpers';
// services & utilities imports
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
// UI imports

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { id: editId, ...editValues } = cabinToEdit;
	// if there's an id, it means it came from the server
	const isEditSession = Boolean(editId);

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		// formState,
		formState: { errors },
	} = useForm({
		defaultValues: editValues,
	});
	// const { errors } = formState;

	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();
	const isWorking = isCreating || isEditing;

	function onSubmit(formData) {
		// console.log(isEditSession ? 'Editing...' : 'Adding...');
		// console.log(formData);

		const image =
			typeof formData.image === 'string' ? formData.image : formData.image[0];
		// check later if I handled it right in the API service
		if (isEditSession) {
			// the object properties must have the same names as the properties in the mutationFn
			editCabin(
				{ cabin: { ...formData, image }, id: editId },
				{
					onSuccess: (data) => {
						console.log(data);
						reset();
						onCloseModal?.();
					},
				},
			);
		} else {
			createCabin(
				{ ...formData, image },
				{
					onSuccess: (data) => {
						console.log(data);
						reset();
						onCloseModal?.();
					},
				},
			);
		}
	}
	// function onError(errors) {
	// 	console.log(errors);
	// }

	return (
		<Form
			type={onCloseModal && 'modal'}
			onSubmit={handleSubmit(onSubmit /*, onError*/)}>
			{/* Text inputs */}
			<>
				<FormRow
					label={'Cabin Name'}
					error={errors?.name}>
					<Input
						type="text"
						disabled={isWorking}
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
						disabled={isWorking}
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
						disabled={isWorking}
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
					label="Discount"
					error={errors?.discount}>
					<Input
						type="number"
						id="discount"
						disabled={isWorking}
						defaultValue={20}
						{...register('discount', {
							required: 'This field is required',
							min: {
								value: 0,
								message: `Discount should be at least ${formatCurrency(0)}`,
							},
							validate: (value) => {
								Number(value) < Number(getValues().regularPrice) ||
									'discount should be less than the regular price';
							},
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
						disabled={isWorking}
						{...register('description', {
							required: 'This field is required',
						})}
					/>
				</FormRow>
			</>
			{/* File input */}
			<FormRow
				label={'Cabin photo'}
				error={errors?.image}>
				<FileInput
					id="image"
					accept="image/*"
					disabled={isWorking}
					{...register('image', {
						required: isEditSession ? false : 'this field is required',
					})}
				/>
			</FormRow>
			{/* Button inputs */}
			<FormRow>
				<Button
					variation="secondary"
					disabled={isWorking}
					//type:"reset" is a regular html attribute
					type="reset"
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button
					disabled={isWorking}
					//type:"submit" is the default
					type="submit">
					{isEditSession ? 'Edit cabin' : 'Add cabin'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
