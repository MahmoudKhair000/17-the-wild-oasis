import styled from 'styled-components';

const Input = styled.input`
	margin-inline: auto;
	padding: 10px;
	width: 100%;
	/* width: 70%; */
	border-radius: 10px;
	color: var(--color-grey-700);
	background-color: var(--color-grey-100);
	border: 1px solid var(--color-grey-300);

	&::placeholder {
		color: gray;
	}
`;

export default Input;
