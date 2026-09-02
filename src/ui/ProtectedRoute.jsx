import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	justify-content: center;
	align-items: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	// 1. load authenticated user
	const { user, isLoading, isAuthenticated } = useUser();

	// // logging the user if existing
	// const user_metadata = user?.user_metadata;
	// console.log(user_metadata || 'there is no logged in user');

	useEffect(() => {
		if ((!isAuthenticated && !isLoading) || !user) {
			navigate('/login', { replace: true });
		}
	}, [navigate, user, isLoading, isAuthenticated]);

	// 3. showing a spinner while loading
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// 4. return the AppLayout route if allright
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
