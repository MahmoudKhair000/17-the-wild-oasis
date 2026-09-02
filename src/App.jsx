// Tanstack/reactQuery imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// React hot toaster imports
import { Toaster } from 'react-hot-toast';
// React Router imports
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
// Styles and UI imports
import { DarkModeProvider } from './contexts/DarkModeContext';
import GlobalStyles from './styles/GlobalStyles';

import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';
import { lazy } from 'react';
import { Suspense } from 'react';
import Spinner from './ui/Spinner';

// import Dashboard from './pages/Dashboard';
// import Bookings from './pages/Bookings';
// import Cabins from './pages/Cabins';
// import Users from './pages/Users';
// import Settings from './pages/Settings';
// import Account from './pages/Account';
// import Login from './pages/Login';
// import PageNotFound from './pages/PageNotFound';
// import Booking from './pages/Booking';
// import Checkin from './pages/Checkin';

// Using (lazy(), Suspense, js import) to split the bundle into chunks
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Settings = lazy(() => import('./pages/Settings'));
const Account = lazy(() => import('./pages/Account'));
const Booking = lazy(() => import('./pages/Booking'));
const Checkin = lazy(() => import('./pages/Checkin'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Users = lazy(() => import('./pages/Users'));
const Login = lazy(() => import('./pages/Login'));

// creating a query client to provide later
const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 1000 } },
});

function App() {
	return (
		// since we won't be needing react router loading features,
		// we'll be using the traditional route elements way
		<>
			<DarkModeProvider>
				<QueryClientProvider client={queryClient}>
					{/* ReactQueryDevtools provider is a closed tag */}
					{/* <ReactQueryDevtools initialIsOpen={false} /> */}
					{/* styled-components styles provider is closed */}
					<GlobalStyles />

					{/* The Browser Router */}
					<BrowserRouter>
						{/* The Browser Router Routes */}
						<Suspense fallback={<Spinner />}>
							{/* contains routes */}
							<Routes>
								{/* The AppLayout Parent Route */}
								<Route
									element={
										<ProtectedRoute>
											<AppLayout />
										</ProtectedRoute>
									}
								>
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
										path="booking/:bookingId"
										element={<Booking />}
									/>
									<Route
										path="checkin/:bookingId"
										element={<Checkin />}
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
						</Suspense>
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
			</DarkModeProvider>
		</>
	);
}

export default App;
