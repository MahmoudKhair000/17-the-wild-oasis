import { createContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useContext } from 'react';
import { useEffect } from 'react';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
	const initialState = () => {
		// first time the app loads, we want to check if the user has a preference for dark mode
		if (localStorage.getItem('isDarkMode') !== null) return;

		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;

		return prefersDark;
	};

	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		initialState,
		'isDarkMode',
	);

	useEffect(() => {
		let classList = document.documentElement.classList;
		if (isDarkMode)
			(classList.remove('light-mode'), classList.add('dark-mode'));
		if (!isDarkMode)
			(classList.remove('dark-mode'), classList.add('light-mode'));
	}, [isDarkMode]);

	function toggleDarkMode() {
		setIsDarkMode((d) => !d);
	}

	return (
		<>
			<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
				{children}
			</DarkModeContext.Provider>
		</>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined)
		throw new Error('DarkMode was used outside of its provider');
	return context;
}

export { useDarkMode, DarkModeProvider };
