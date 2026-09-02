import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	const {
		register,
		getValues,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	// console.log(getValues());

	const { signup, isSigningUp } = useSignup();

	function onSubmit({ fullName, email, password }) {
		// console.log({ fullName, email, password });
		signup({ fullName, email, password }, { onSettled: reset });
	}

	function onvError() {
		if (Array.from(errors).length == 0) {
			// console.log(errors, Array.from(errors).length);
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onvError)}>
			<FormRow
				label="Full name"
				error={errors?.fullName}
				// error={''}
			>
				<Input
					type="text"
					id="fullName"
					disabled={isSigningUp}
					{...register('fullName', {
						required: 'This field is required',
						validate: (val) =>
							val.length >= 10 || 'Full Name should be at least 10 letters',
					})}
				/>
			</FormRow>

			<FormRow
				label="Email address"
				error={errors?.email}
			>
				<Input
					type="email"
					id="email"
					disabled={isSigningUp}
					{...register('email', {
						required: 'This field is required',
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'The e-mail address you entered is invalid',
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password}
			>
				<Input
					type="password"
					id="password"
					disabled={isSigningUp}
					{...register('password', {
						required: 'This field is required',
						// validate: (val) =>
						// 	val == getValues().passwordConfirm ||
						// 	'password and confirmation should match',
					})}
				/>
			</FormRow>

			<FormRow
				label="Repeat password"
				error={errors?.passwordConfirm}
			>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isSigningUp}
					{...register('passwordConfirm', {
						required: 'This field is required',
						validate: (val) =>
							val == getValues().password
							|| 'password and confirmation should match',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					disabled={isSigningUp}
					variation="secondary"
					type="reset"
				>
					Cancel
				</Button>
				<Button
					disabled={isSigningUp}
					variation="primary"
				>
					Create new user
				</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
