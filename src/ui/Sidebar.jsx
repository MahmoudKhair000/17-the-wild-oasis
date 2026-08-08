import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
import { NavLink } from 'react-router-dom';

const StyledSidebar = styled.aside`
	background-color: var(--color-grey-0);
	box-sizing: border-box;
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-grey-100);

	/* grid element styles */
	/* takes from first to last row */
	grid-row: 1/ -1;

	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

function Sidebar() {
	return (
		<StyledSidebar>
			<NavLink to="/dashboard">
				<Logo />
			</NavLink>
			<MainNav />
		</StyledSidebar>
	);
}

export default Sidebar;
