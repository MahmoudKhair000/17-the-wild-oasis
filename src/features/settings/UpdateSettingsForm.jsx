import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

import { useSettings } from './useSettings';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
	const { isReading, settings } = useSettings();

	const {
		register,
		// handleSubmit,
		// reset,
		// formState: { errors },
	} = useForm();
	// } = useForm({ defaultValues: settings });

	const { isUpdating, updateSetting } = useUpdateSetting();

	function handleUpdate(e) {
		// e.preventDefault();
		const { name, value } = e.target;
		// console.log(name, value);
		updateSetting({ [name]: value });
	}

	// const isWorking = isUpdating || isReading;
	if (isReading || !settings) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					// remove the id for onblur will work on label as well
					{...register('minBookingLength', {
						// validate: (value) => {},
					})}
					defaultValue={settings.minBookingLength}
					onBlur={(e) => {
						handleUpdate(e);
					}}
					disabled={isUpdating}
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					// remove the id for onblur will work on label as well
					{...register('maxBookingLength', {
						// validate: (value) => {},
					})}
					defaultValue={settings.maxBookingLength}
					onBlur={(e) => {
						handleUpdate(e);
					}}
					disabled={isUpdating}
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					// remove the id for onblur will work on label as well
					{...register('maxGuestsPerBooking', {
						// validate: (value) => {},
					})}
					defaultValue={settings.maxGuestsPerBooking}
					onBlur={(e) => {
						handleUpdate(e);
					}}
					disabled={isUpdating}
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					// remove the id for onblur will work on label as well
					{...register('breakfastPrice', {
						// validate: (value) => {},
					})}
					defaultValue={settings.breakfastPrice}
					onBlur={(e) => {
						handleUpdate(e);
					}}
					disabled={isUpdating}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
