import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Logo from './Logo';
import MainNav from './MainNav';
// import Uploader from '../data/Uploader';

const StyledSidebar = styled.aside`
	background-color: var(--color-grey-0);
	box-sizing: border-box;
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-grey-100);

	/* grid element styles */
	grid-row: 1/ -1;
	/* takes from first to last row */
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
			{/* <Uploader /> */}
		</StyledSidebar>
	);
}

export default Sidebar;
