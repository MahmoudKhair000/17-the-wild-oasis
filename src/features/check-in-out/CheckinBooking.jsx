import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import Tag from '../../ui/Tag';
import Modal from '../../ui/Modal';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import CheckBox from '../../ui/Checkbox';

import BookingDataBox from '../bookings/BookingDataBox';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import { useSettings } from '../settings/useSettings';
import { useCheckin } from './useCheckin';
import { formatCurrency } from '../../utils/helpers';
import ConfirmDelete from '../../ui/ConfirmDelete';
import useDeleteBooking from '../bookings/useDeleteBooking';

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;
const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;
const StyledTag = styled(Tag)`
	scale: 1.6;
	transform: translateX(2.4rem);
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);

	const { booking, isLoading } = useBooking();
	const { checkin, isCheckingIn } = useCheckin();
	const { settings, isLoading: isLoadingSettings } = useSettings();
	const { deleteBookingMutate: deleteBooking, isDeleting } = useDeleteBooking();

	const moveBack = useMoveBack();
	const navigate = useNavigate();
	const { bookingId } = useParams();
	// const navigate = useNavigate();

	useEffect(() => {
		setConfirmPaid(booking?.isPaid);
		setAddBreakfast(booking?.hasBreakfast);

		if (booking?.status === 'checked-in' && booking?.hasBreakfast) {
			navigate(`/booking/${bookingId}`);
		}
	}, [booking, navigate, bookingId]);

	if (
		isCheckingIn
		|| isLoading
		|| isLoadingSettings
		|| Number(bookingId) !== booking?.id
	)
		return <Spinner />;

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};
	const { id, guests, totalPrice, numGuests, hasBreakfast, numNights } =
		booking;

	const optionslBreakfastPrice =
		settings?.breakfastPrice * numNights * numGuests;

	function handleCheckin() {
		// const update = { status: '', isPaid: true };
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkin({
				bookingId: booking.id,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionslBreakfastPrice,
					totalPrice: totalPrice + optionslBreakfastPrice,
				},
			});
		} else {
			checkin({ bookingId: booking.id, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Check in booking #{id}</Heading>
					<StyledTag type={statusToTagName[booking?.status] || 'blue'}>
						{booking?.status?.replace('-', ' ')}
					</StyledTag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<CheckBox
						id="breakfast"
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((add) => !add);
							setConfirmPaid(false);
						}}
						disabled={hasBreakfast}
						// defaultChecked={booking?.hasBreakfast}
					>
						Want to add breakfast for {formatCurrency(optionslBreakfastPrice)}?
					</CheckBox>
				</Box>
			)}

			<Box>
				<CheckBox
					id="paid"
					checked={confirmPaid}
					onChange={() => setConfirmPaid((x) => !x)}
					disabled={confirmPaid}
					// defaultChecked={booking?.isPaid}
				>
					I confirm that {guests.fullName} has paid the total amount{' '}
					{formatCurrency(
						addBreakfast ? totalPrice + optionslBreakfastPrice : totalPrice,
					)}{' '}
					{addBreakfast
						? `(${formatCurrency(totalPrice)} + ${formatCurrency(optionslBreakfastPrice)})`
						: ''}
				</CheckBox>
			</Box>
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
									deleteBooking(bookingId, {
										onSettled: () => {
											navigate('/bookings');
										},
									})
								}
								disabled={isDeleting}
							/>
						</Modal.Window>
					</Modal>

					<Button
						onClick={handleCheckin}
						disabled={!confirmPaid || isCheckingIn}
					>
						Check in booking #{id}
					</Button>
					<Button
						variation="secondary"
						onClick={moveBack}
					>
						Back
					</Button>
				</ButtonGroup>
			</>
		</>
	);
}

export default CheckinBooking;
