import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Account() {
	return (
		<Row>
			<Row
			// style={{
			// 	position: 'sticky',
			// 	backgroundColor: 'var(--color-grey-50)',
			// 	marginTop: '-4rem',
			// 	paddingTop: '4rem',
			// 	transform: 'translateY(-4rem)',
			// 	zIndex: '1',
			// 	top: '0',
			// }}
			>
				<Heading as="h1">Update your account</Heading>
			</Row>

			<Row>
				<Heading as="h3">Update user data</Heading>
				<UpdateUserDataForm />
			</Row>

			<Row>
				<Heading as="h3">Update password</Heading>
				<UpdatePasswordForm />
			</Row>
		</Row>
	);
}

export default Account;
