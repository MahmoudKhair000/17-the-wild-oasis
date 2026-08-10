import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import { getCabins } from '../../services/apiCabins';
import { useQuery } from '@tanstack/react-query';
import CabinRow from './CabinRow';

// const TableContainer = styled.dev`
// `;
const Table = styled.div`
	border: 1px solid var(--color-grey-200);
	width: 100%;
	max-width: var(--cabin-table-max-width);
	margin: 0 auto;
	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: 7px;
	overflow: auto;
`;
const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 1.5fr 1fr 2.5fr 1fr 1fr 1fr;
	column-gap: 1rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	> * {
		padding: 1.4rem 0;
		margin: 0 auto;
	}
`;

function CabinTable() {
	const query = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
	});

	const { data: cabins, isLoading } = query;

	if (isLoading) return <Spinner />;

	return (
		<Table role="table">
			<TableHeader role="row">
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</TableHeader>

			{cabins.map((cabin) => (
				<CabinRow
					key={cabin.id}
					cabinData={cabin}
				/>
			))}
		</Table>
	);
}

export default CabinTable;
