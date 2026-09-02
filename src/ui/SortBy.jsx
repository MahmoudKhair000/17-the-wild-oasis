import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get('sort') || '';

	function handleChange(e) {
		searchParams.set('sort', e.target.value);
		// Set the pagination page to 1 as the sorting changes
		searchParams.set('page', 1);
		setSearchParams(searchParams);
	}

	return (
		<Select
			type="white"
			options={options}
			value={sortBy}
			onChange={handleChange}
		/>
	);
}

export default SortBy;
