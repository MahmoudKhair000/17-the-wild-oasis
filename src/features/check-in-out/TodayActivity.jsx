import styled from 'styled-components';

import TodayItem from './TodayItem';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import { useTodayActivity } from './useTodayActivity';
import Spinner from '../../ui/Spinner';
// import Empty from '../../ui/Empty';

const StyledToday = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 3.2rem;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	grid-column: 1 / span 2;
	padding-top: 2.4rem;
`;

const TodayList = styled.ul`
	overflow: scroll;
	overflow-x: hidden;

	/* Removing scrollbars for webkit, firefox, and ms, respectively */
	&::-webkit-scrollbar {
		width: 0 !important;
	}
	scrollbar-width: none;
	-ms-overflow-style: none;
`;

const NoActivityBox = styled.p`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
`;
const NoActivity = styled.p`
	text-align: center;
	font-size: 1.8rem;
	font-weight: 500;
	margin-top: 0.8rem;
`;

function TodayActivity() {
	const { stays, isLoading } = useTodayActivity();
	// console.log(stays);

	// // It is handled in the UI returned jsx
	// if (isLoading) return <Spinner />;
	// if(!isLoading && !stays) return <Empty resourceName={'T'}/>

	return (
		<StyledToday>
			<Row type="horizontal">
				<Heading as="h2">Today</Heading>
			</Row>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					{stays && stays.length > 0 ? (
						<TodayList>
							{stays.map((stay) => (
								<TodayItem
									key={stay.id}
									stay={stay}
								/>
							))}
						</TodayList>
					) : (
						<NoActivityBox>
							<NoActivity>No activity today...</NoActivity>
						</NoActivityBox>
					)}
				</>
			)}
		</StyledToday>
	);
}

export default TodayActivity;
