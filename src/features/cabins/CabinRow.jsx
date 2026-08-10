import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { deleteCabin } from '../../services/apiCabins';
import { HiOutlineTrash } from 'react-icons/hi2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
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
const DeleteBtn = styled.button`
	padding: 7.5px 15px;
	font-size: 20px;
	/* absurd 999999px is for pill shape */
	border-radius: 99999999px;
	border: 1px solid var(--color-red-700);
	color: var(--color-red-700);
	background-color: var(--color-red-100);
`;

function CabinRow({ cabinData }) {
	const { id, name, maxCapacity, regularPrice, discount, image } = cabinData;
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			toast.success('Cabin successfully deleted!');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (err) => {
			console.log(err);
			toast.error(err.message);
		},
	});

	const tempImage =
		'https://hrqxtwqgkuljmyfbiohl.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg';
	return (
		<DividedDiv>
			<TableRow>
				<ImgContainer>
					<Img
						src={image || tempImage}
						alt={`${name} image`}
					/>
				</ImgContainer>

				<Cabin>{name}</Cabin>
				<div>Fits up to {maxCapacity} guests</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				<Discount>{formatCurrency(discount)}</Discount>

				<div>
					<DeleteBtn
						disabled={isDeleting}
						onClick={() => mutate(id)}>
						<HiOutlineTrash />
					</DeleteBtn>
				</div>
			</TableRow>
		</DividedDiv>
	);
}

export default CabinRow;
