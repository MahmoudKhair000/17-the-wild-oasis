/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
	HiCalendarDays,
	HiCog6Tooth,
	HiHome,
	HiHomeModern,
	HiOutlineCalendarDays,
	HiOutlineCog6Tooth,
	HiOutlineHome,
	HiOutlineHomeModern,
	HiOutlineUser,
	HiOutlineUsers,
	HiUser,
	HiUsers,
} from 'react-icons/hi2';
import { useLocation } from 'react-router-dom';

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;
const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	/* This works because react-router places the active class on the active NavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		background-color: var(--color-grey-50);
		border-radius: var(--border-radius-sm);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

function MainNav() {
	const route = useLocation().pathname;
	// console.log(route);

	return (
		<>
			<nav>
				<NavList>
					<li>
						<StyledNavLink to="/dashboard">
							{route === '/dashboard' ? <HiHome /> : <HiOutlineHome />}
							<span>Home</span>
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to="/bookings">
							{route === '/bookings' ? (
								<HiCalendarDays />
							) : (
								<HiOutlineCalendarDays />
							)}
							<span>Bookings</span>
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to="/cabins">
							{route === '/cabins' ? <HiHomeModern /> : <HiOutlineHomeModern />}
							<span>Cabins</span>
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to="/users">
							{route === '/users' ? <HiUsers /> : <HiOutlineUsers />}
							<span>Users</span>
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to="/settings">
							{route === '/settings' ? <HiCog6Tooth /> : <HiOutlineCog6Tooth />}
							<span>Settings</span>
						</StyledNavLink>
					</li>
					<li>
						<StyledNavLink to="/account">
							{route === '/account' ? <HiUser /> : <HiOutlineUser />}
							<span>Account</span>
						</StyledNavLink>
					</li>
				</NavList>
			</nav>
		</>
	);
}

export default MainNav;

export { NavList, StyledNavLink };
