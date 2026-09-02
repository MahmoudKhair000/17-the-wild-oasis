import Heading from '../ui/Heading';
import SignupForm from '../features/authentication/SignupForm';

function NewUsers() {
	return (
		<>
			<Heading as="h1">Create a new user</Heading>
			<SignupForm />
			{/* <br />
			<Heading as="h1">Create a new user</Heading> */}
		</>
	);
}

export default NewUsers;
