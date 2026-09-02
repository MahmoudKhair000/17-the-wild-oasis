import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';
import styled from 'styled-components';
import { useDarkMode } from '../../contexts/DarkModeContext';
import Spinner from '../../ui/Spinner';
import Heading from '../../ui/Heading';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const ChartBox = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 2.4rem 3.2rem;
	grid-column: 3 / span 2;

	& * {
		/* to remove the annoying outline when focusing on a piece of the chart */
		outline: none !important;
	}

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}
	& .recharts-legend-wrapper {
		transition: all 0.5s ease-in-out !important;
	}
`;

const startDataLight = [
	{
		duration: '1 night',
		value: 0,
		color: '#ef4444',
	},
	{
		duration: '2 nights',
		value: 0,
		color: '#f97316',
	},
	{
		duration: '3 nights',
		value: 0,
		color: '#eab308',
	},
	{
		duration: '4-5 nights',
		value: 0,
		color: '#84cc16',
	},
	{
		duration: '6-7 nights',
		value: 0,
		color: '#22c55e',
	},
	{
		duration: '8-14 nights',
		value: 0,
		color: '#14b8a6',
	},
	{
		duration: '15-21 nights',
		value: 0,
		color: '#3b82f6',
	},
	{
		duration: '21+ nights',
		value: 0,
		color: '#a855f7',
	},
];
const startDataDark = [
	{
		duration: '1 night',
		value: 0,
		color: '#b91c1c',
	},
	{
		duration: '2 nights',
		value: 0,
		color: '#c2410c',
	},
	{
		duration: '3 nights',
		value: 0,
		color: '#a16207',
	},
	{
		duration: '4-5 nights',
		value: 0,
		color: '#4d7c0f',
	},
	{
		duration: '6-7 nights',
		value: 0,
		color: '#15803d',
	},
	{
		duration: '8-14 nights',
		value: 0,
		color: '#0f766e',
	},
	{
		duration: '15-21 nights',
		value: 0,
		color: '#1d4ed8',
	},
	{
		duration: '21+ nights',
		value: 0,
		color: '#7e22ce',
	},
];

function prepareData(startData, stays) {
	// A bit ugly code, but sometimes this is what it takes when working with real data 😅

	function incArrayValue(arr, field) {
		return arr.map((obj) =>
			obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
		);
	}

	const data = stays
		.reduce((arr, cur) => {
			const num = cur.numNights;

			if (num === 1) return incArrayValue(arr, '1 night');
			if (num === 2) return incArrayValue(arr, '2 nights');
			if (num === 3) return incArrayValue(arr, '3 nights');
			if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
			if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
			if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
			if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
			if (num >= 21) return incArrayValue(arr, '21+ nights');
			return arr;
		}, startData)
		.filter((obj) => obj.value > 0);

	return data;
}

function DurationChart({ stays }) {
	const chartBoxRef = useRef(null);
	const [showLegend, setShowLegend] = useState(false);
	const { isDarkMode } = useDarkMode();

	// Start showLegend Effect logic
	useEffect(() => {
		const box = chartBoxRef.current;
		if (!box) return;

		const handleResize = () => {
			// it holds pie & legend at exactly 470
			setShowLegend(box.offsetWidth >= 480);
			// console.log('box.offsetWidth', box.offsetWidth);
		};

		handleResize(); // Initializing the state

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);
	// End showLegend Effect logic

	if (!stays) return <Spinner />;

	const labelProps = () =>
		!showLegend ? { label: true, labelLine: false } : null;
	const startData = isDarkMode ? startDataDark : startDataLight;
	const chartData = prepareData(startData, stays);
	// console.log(chartData);

	return (
		<ChartBox
			// we assign the ref to this element
			// , as it's a real dom element
			ref={chartBoxRef}
			// , not a ReactElement nor a ReactComponent
		>
			<Heading as="h2">Stay duration summary</Heading>
			{/* The Pie Chart */}
			<>
				<ResponsiveContainer
					width={'100%'}
					height={240}
				>
					<PieChart>
						<Pie
							width={'100%'}
							data={chartData}
							dataKey="value"
							nameKey="duration"
							innerRadius={showLegend ? 80 : 50}
							outerRadius={showLegend ? 100 : 80}
							cx={showLegend ? '40%' : '50%'}
							cy="50%"
							paddingAngle={2}
							{...labelProps()}
							//
						>
							{chartData.map((entry) => (
								<Cell
									key={entry.duration}
									stroke={entry.color}
									fill={entry.color}
									// name={entry.duration}
									// // will save us trouble with tooltip
								/>
							))}
						</Pie>
						<Tooltip
							// it takes an array of [value, name]
							formatter={(value, name, item) => [
								`${value} stays`,
								item.payload.duration,
							]}
						/>
						{showLegend && (
							// <StyledLegend>
							<Legend
								verticalAlign="middle"
								align="right"
								width="30%"
								layout="vertical"
								iconSize={15}
								iconType="circle"
								formatter={(value) => value}
							/>
							// </StyledLegend>
						)}
					</PieChart>
				</ResponsiveContainer>
			</>
		</ChartBox>
	);
}

export default DurationChart;
