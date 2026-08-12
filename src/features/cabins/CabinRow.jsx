import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import {
	HiOutlinePencil,
	HiOutlineSquare2Stack,
	HiOutlineTrash,
	HiOutlineXMark,
} from 'react-icons/hi2';
import { useState } from 'react';
import useDeleteCabin from './useDeleteCabin';
import useCreateCabin from './useCreateCabin';

const DividedDiv = styled.div`
	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	padding: 2.5px 0;

	&:last-of-type {
		padding-bottom: 0 !important;
	}
	&:first-of-type {
		padding-top: 0 !important;
	}
`;
const TableRow = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 1fr 2.5fr 1fr 1fr 1fr;
	align-items: center;
	column-gap: 1rem;
	max-height: 80px;

	> * {
		/* border: 1px solid red; */
		/* padding: 0.7rem 1.2rem; */
		padding: 1.4rem 0;
		margin: 0 auto;
	}
`;

const ImgContainer = styled.div`
	display: block;
	padding: 0;

	width: fit-content;

	min-height: 70px;
	height: 100%;
	max-height: 80px;

	overflow: hidden;
`;
const Img = styled.img`
	display: block;

	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	border-right: 1px solid var(--color-grey-100);
	/* transform: scale(1.5) translateX(-7px); */
	@media (max-width: 992px) {
		height: 100%;
	}
`;
const Cabin = styled.div`
	align-content: center;

	font-size: 1.6rem;
	font-weight: 600;
	height: 80px;
	color: var(--color-grey-600);
	font-family: 'Sono';

	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	/* overflow-wrap: break-word; */

	/* word-break: break-all; */
	/* hyphens: manual; */
`;
const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;
const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

const BtnDiv = styled.div`
	padding: 5px;

	display: flex;
	gap: 5px;
	justify-content: space-evenly;
	align-items: center;
`;
const DeleteBtn = styled.button`
	padding: 3px;
	font-size: 14px;
	height: fit-content;
	/* absurd 999999px is for pill shape */
	border-radius: 99999999px;
	border: 1px solid var(--color-red-700);
	color: var(--color-red-700);
	background-color: var(--color-red-100);
`;
const DuplicateBtn = styled.button`
	padding: 3px;
	font-size: 14px;
	height: fit-content;
	/* absurd 999999px is for the pill shape */
	border-radius: 99999999px;
	border: 1px solid var(--color-green-700);
	color: var(--color-green-700);
	background-color: var(--color-green-100);
`;
const EditBtn = styled.button`
	padding: 3px;
	font-size: 14px;
	height: fit-content;
	/* absurd 999999px is for the pill shape */
	border-radius: 99999999px;
	border: 1px solid var(--color-indigo-700);
	color: var(--color-indigo-700);
	background-color: var(--color-brand-50);
`;

function CabinRow({ cabinData }) {
	const {
		id: cabinId, //
		name, //
		maxCapacity, //
		regularPrice, //
		discount, //
		description, //
		image, //
	} = cabinData;

	const [showForm, setShowForm] = useState(false);

	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { isCreating, createCabin } = useCreateCabin();

	const isWorking = isDeleting || isCreating;

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			description,
			image,
		});
	}
	return (
		<>
			<DividedDiv>
				<TableRow>
					<ImgContainer>
						<Img
							src={image}
							alt={`${name} image`}
						/>
					</ImgContainer>

					<Cabin title={name}>{name}</Cabin>

					<div>Fits up to {maxCapacity} guests</div>

					<Price>{formatCurrency(regularPrice)}</Price>

					<Discount>
						{discount ? formatCurrency(discount) : <span>&mdash;</span>}
					</Discount>

					<BtnDiv>
						<DuplicateBtn
							// disabled={showForm}
							onClick={() => {
								handleDuplicate();
							}}>
							<HiOutlineSquare2Stack />
						</DuplicateBtn>

						<EditBtn
							// disabled={showForm}
							onClick={() => {
								setShowForm((prev) => !prev);
							}}>
							{!showForm ? <HiOutlinePencil /> : <HiOutlineXMark />}
						</EditBtn>

						<DeleteBtn
							disabled={isWorking}
							onClick={() => deleteCabin(cabinId)}>
							<HiOutlineTrash />
						</DeleteBtn>
					</BtnDiv>
				</TableRow>
			</DividedDiv>

			{showForm && (
				<CreateCabinForm
					type={'modal'}
					cabinToEdit={cabinData}
				/>
			)}
		</>
	);
}

export default CabinRow;
