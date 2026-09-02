import Heading from '../ui/Heading';
import Row from '../ui/Row';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';

function Bookings() {
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
				<Heading as="h1">All bookings</Heading>
				<BookingTableOperations />
			</Row>

			<BookingTable />
		</>
	);
}

export default Bookings;
