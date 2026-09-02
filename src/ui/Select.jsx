import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledSelect = styled.select`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${(props) =>
			props.type === 'white'
				? 'var(--color-grey-100)'
				: 'var(--color-grey-300)'};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
	/* & > option {
	} */
`;
const StyledOption = styled.option`
	${(props) =>
		props.active === 'true' &&
		css`
			background-color: var(--color-brand-600) !important;
			color: var(--color-brand-50) !important;
		`}
`;

function Select({ options, value, onChange, ...props }) {
	const [searchParams] = useSearchParams();
	const currentSort = searchParams.get('sort') || options?.[0]?.value;
	// console.log(props);

	return (
		<StyledSelect
			value={value}
			onChange={onChange}
			{...props}>
			{options.map((o) => (
				<StyledOption
					key={o.value}
					active={String(currentSort === o.value)}
					value={o.value}>
					{o.label}
				</StyledOption>
			))}
		</StyledSelect>
	);
}

export default Select;
