import {
	HiOutlineBriefcase,
	HiOutlineCalendar,
	HiOutlineChartBar,
} from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, stays, numDays, cabinCount }) {
	// 1.
	const numBookings = bookings.length;
	// const numStays = stays.length;
	// 2.
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
	// 3.
	const checkIns = stays.length;
	// 4.
	const occupation =
		Number(stays.reduce((acc, cur) => acc + cur.numNights, 0))
		/ (numDays * cabinCount);

	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				color="indigo"
				icon={<HiOutlineCalendar />}
				value={checkIns}
			/>
			<Stat
				title="Occupancy rates"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + '%'}
			/>
		</>
	);
}

export default Stats;
