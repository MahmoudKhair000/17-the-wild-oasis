import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';

function Cabins() {
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
				<Heading as="h1">All cabins</Heading>
				<CabinTableOperations />
			</Row>

			<Row>
				<CabinTable />
			</Row>

			<AddCabin />
		</>
	);
}

export default Cabins;
