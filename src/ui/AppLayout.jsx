// Libraries imports
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
// UI imports
// import Heading from './Heading';
import Header from './Header';
import Sidebar from './Sidebar';
// Global scope blocks
const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
`;

const StyledAppLayout = styled.div`
	height: 100vh;
	/* grid container styles */
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
`;
// Components imports
function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				<Outlet />
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;
