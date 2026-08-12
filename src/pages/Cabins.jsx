// import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

function Cabins() {
	const queryClient = useQueryClient();
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		if (queryClient.getQueryState().modals === 'closed') setShowForm(false);
	}, [queryClient]);
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

				<Button
					onClick={() => {
						setShowForm((prev) => !prev);
					}}>
					{`${showForm ? `Hide` : `Show`} new cabin form`}
				</Button>
			</Row>
			{showForm && <CreateCabinForm />}
		</>
	);
}

export default Cabins;
