import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
	const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<div
			style={{
				width: '100%',
				maxWidth: 'var(--cabin-table-max-width)',
				margin: '0 auto',
			}}>
			<Button
				style={{
					width: '100%',
				}}
				onClick={() => {
					setIsOpenModal((prev) => !prev);
				}}>
				{`${isOpenModal ? `Hide` : `Show`} new cabin form`}
			</Button>
			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
				</Modal>
			)}
		</div>
	);
}

export default AddCabin;
