import styled from 'styled-components';

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 18rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 1rem;

	&:first-child {
		padding-top: 0;
	}
	&:last-child {
		padding-bottom: 0;
	}
	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;
const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);

	/* margin-inline-start: 1.5rem;
	padding: 0 0.5rem;
	background-color: var(--color-red-100);
	border-radius: 0.5rem;
	border: 0.5px solid var(--color-red-700); */
`;

function FormRow({ label, error, children }) {
	return (
		<StyledFormRow>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error?.message}</Error>}
		</StyledFormRow>
	);
}

export default FormRow;
