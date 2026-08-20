import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import useCabins from './useCabins';

function CabinTable() {
	const { cabins, isLoading } = useCabins();

	if (isLoading) return <Spinner />;

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
					data={cabins}
					render={(cabin) => (
						<CabinRow
							key={cabin.id}
							cabinData={cabin}
						/>
					)}
				/>
				{/* {.map()} */}
			</Table>
		</Menus>
	);
}

export default CabinTable;
