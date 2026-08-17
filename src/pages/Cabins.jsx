import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';

function Cabins() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<p>Filter / Sort</p>
			</Row>

			<Row
				style={{
					maxWidth: 'var(--cabin-table-max-width)',
					margin: '0 auto',
				}}>
				<CabinTable />
			</Row>

			<AddCabin />
		</>
	);
}

export default Cabins;
