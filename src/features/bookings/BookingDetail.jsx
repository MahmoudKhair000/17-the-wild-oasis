import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import Modal from '../../ui/Modal';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ConfirmDelete from '../../ui/ConfirmDelete';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Button from '../../ui/Button';

import BookingDataBox from './BookingDataBox';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import useDeleteBooking from './useDeleteBooking';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;
const StyledTag = styled(Tag)`
	scale: 1.6;
	transform: translateX(2.4rem);
`;

function BookingDetail() {
	const { booking, isLoading } = useBooking();
	const { checkout, isCheckingout } = useCheckout();
	const { deleteBookingMutate: deleteBooking, isDeleting } = useDeleteBooking();
	// const { id, status } = booking;

	const { bookingId } = useParams();
	const moveBack = useMoveBack();
	const navigate = useNavigate();

	// function handleDelete() {
	// 	deleteBooking(booking.id);
	// 	navigate('/bookings');
	// }

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	if (isLoading || Number(bookingId) !== Number(booking.id)) return <Spinner />;

	// console.log(booking);
	if (!booking) return <Empty resourceName={'Booking'} />;

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{booking.id}</Heading>
					<StyledTag type={statusToTagName[booking.status]}>
						{booking.status.replace('-', ' ')}
					</StyledTag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<>
				<ButtonGroup>
					<Modal>
						<Modal.Open opens="delete">
							<Button
								variation="danger"
								disabled={isDeleting}
							>
								Delete Booking
							</Button>
						</Modal.Open>
						<Modal.Window name="delete">
							<ConfirmDelete
								resourceName={`Booking #${booking?.id}`}
								onConfirm={() =>
									deleteBooking(booking.id, {
										onSettled: () => {
											navigate('/bookings');
										},
									})
								}
								disabled={isDeleting}
							/>
						</Modal.Window>
					</Modal>

					<>
						{booking.status === 'checked-in' && (
							<Button
								onClick={() => checkout(booking.id)}
								disabled={isCheckingout}
							>
								Check out
							</Button>
						)}

						{booking.status === 'unconfirmed' && (
							<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
								Check in
							</Button>
						)}

						{booking.status === 'checked-in' && !booking.hasBreakfast && (
							<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
								Add Breakfast
							</Button>
						)}
					</>

					<Button
						variation="secondary"
						onClick={() => navigate('/bookings')}
					>
						Back
					</Button>
				</ButtonGroup>
			</>
		</>
	);
}

export default BookingDetail;
