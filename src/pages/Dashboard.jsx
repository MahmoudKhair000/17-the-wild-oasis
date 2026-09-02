// import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
// import SpinnerMini from '../ui/SpinnerMini';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import DashboardFilter from '../features/dashboard/DashboardFilter';

function Dashboard() {
	return (
		<>
			<Row
				type="horizontal"
				style={{
					position: 'sticky',
					backgroundColor: 'var(--color-grey-50)',
					marginTop: '-4rem',
					paddingTop: '4rem',
					transform: 'translateY(-4rem)',
					zIndex: '1',
					top: '0',
				}}
			>
				<Heading as="h1">Dashboard</Heading>
				<DashboardFilter />
			</Row>
			<>
				<DashboardLayout />
			</>
		</>
	);
}

export default Dashboard;
