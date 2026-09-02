import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import useCabins from './useCabins';
import Empty from '../../ui/Empty';

function CabinTable() {
	const { cabins, isLoading } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (!cabins.length) return <Empty resourceName="cabins" />;

	// 1. Filtering
	const filterValue = searchParams.get('discount');
	// console.log(filterValue);
	let filteredCabins;
	switch (filterValue) {
		case 'all':
			filteredCabins = cabins;
			break;

		case 'no-discount':
			// filteredCabins = cabins.filter((c) => !c.discount);
			filteredCabins = cabins.filter((c) => c.discount === 0);
			break;

		case 'with-discount':
			// filteredCabins = cabins.filter((c) => c.discount);
			filteredCabins = cabins.filter((c) => c.discount > 0);
			break;

		default:
			filteredCabins = cabins;
			break;
	}

	// 2. Sorting
	const sortBy = searchParams.get('sort') || 'name-asc';
	const [field, direction] = sortBy.split('-');
	// console.log([field, direction]);
	const dirModifier = direction === 'asc' ? 1 : -1;
	let sortedCabins = filteredCabins.sort(
		(a, b) => dirModifier * (a[field] - b[field]),
	);

	return (
		<Menus>
			{/* to Provide the menuContext to all table rows */}
			<Table columns="1.5fr 1fr 2fr 1fr 1fr 0.7fr">
				<Table.Header role="row">
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					// data={cabins}
					// data={filteredCabins}
					data={sortedCabins}
					render={(cabin) => (
						<CabinRow
							key={cabin.id}
							cabinData={cabin}
							//{data.map(render)}
						/>
					)}
				/>
			</Table>
		</Menus>
	);
}

export default CabinTable;
