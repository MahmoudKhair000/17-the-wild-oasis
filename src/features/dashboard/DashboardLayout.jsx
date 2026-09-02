import styled from 'styled-components';

import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import useCabins from '../cabins/useCabins';

import Stats from './Stats';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import TodayActivity from '../check-in-out/TodayActivity';

import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	/* 1rem = 16px */
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { isLoading: isLoadingBookings, bookingsData } = useRecentBookings();
	const { isLoading: isLoadingStays, staysData, numDays } = useRecentStays();
	const { cabins, isLoading: isLoadingCabins } = useCabins();

	if (isLoadingCabins || isLoadingBookings || isLoadingStays)
		return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookingsData}
				stays={staysData}
				numDays={numDays}
				cabinCount={cabins?.length}
			/>
			<TodayActivity />
			<DurationChart stays={staysData} />
			<SalesChart
				bookings={bookingsData}
				numDays={numDays}
			/>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
