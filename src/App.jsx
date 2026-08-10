// Tanstack/reactQuery imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Tanstack/reactQuery Devtools imports
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// React Router imports
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
// Styles and UI imports
import GlobalStyles from './styles/GlobalStyles';
import {
	Dashboard,
	Bookings,
	Cabins,
	Users,
	Settings,
	Account,
	Login,
	PageNotFound,
} from './pages/PagesAPI';
import AppLayout from './ui/AppLayout';
import { Toaster } from 'react-hot-toast';

// creating a query client to provide later
const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 0, cacheTime: 5000 } },
});

function App() {
	return (
		// since we won't be needing react router loading features,
		// we'll be using the traditional route elements way
		<>
			<QueryClientProvider client={queryClient}>
				{/* ReactQueryDevtools provider is a closed tag */}
				<ReactQueryDevtools initialIsOpen={false} />
				{/* styled-components styles provider is closed */}
				<GlobalStyles />

				{/* The Browser Router */}
				<BrowserRouter>
					{/* The Browser Router Routes */}
					<Routes>
						{/* The AppLayout Parent Route */}
						<Route element={<AppLayout />}>
							{/* The AppLayout Children Routes */}
							{/* <Route index element={<DashBoard />} /> */}
							{/* But it won't redirect us to the main route */}
							<Route
								index
								element={
									<Navigate
										replace
										to="dashboard"
									/>
								}
							/>
							<Route
								path="dashboard"
								element={<Dashboard />}
							/>
							<Route
								path="bookings"
								element={<Bookings />}
							/>
							<Route
								path="cabins"
								element={<Cabins />}
							/>
							<Route
								path="users"
								element={<Users />}
							/>
							<Route
								path="settings"
								element={<Settings />}
							/>
							<Route
								path="account"
								element={<Account />}
							/>
						</Route>
						{/* These routes are out of the layout "OUTPUT" */}
						<Route
							path="login"
							element={<Login />}
						/>
						<Route
							path="*"
							element={<PageNotFound />}
						/>
					</Routes>
				</BrowserRouter>

				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{
						margin: '10px',
					}}
					toastOptions={{
						className: '',
						duration: 5000,
						success: {
							duration: 3000,
						},
						error: {
							duration: 3000,
						},
						style: {
							maxWidth: '500px',
							fontSize: '16px',
							padding: '16px 24px',
							backgroundColor: 'var(--color-grey-0)',
							color: 'var(--color-grey-700)',
						},
					}}
				/>
			</QueryClientProvider>
		</>
	);
}

export default App;
