import { useState, useContext, createContext } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useClickOutside as menusClickOutside } from '../hooks/useClickOutside';
import { createPortal } from 'react-dom';

const StyledMenu = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	/* transform: translateX(0.8rem); */
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;
const StyledList = styled.ul`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.position.x}px;
	top: ${(props) => props.position.y}px;
`;
const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;
	justify-content: space-between;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-500);
		transition: all 0.3s;
	}
`;

// 1. Create context
const MenusContext = createContext();
// 2. Create Parent component/context provider
function Menus({ children }) {
	// Context value states
	const [openId, setOpenId] = useState('');
	const [position, setPosition] = useState(null);
	const open = setOpenId;
	const close = () => setOpenId('');
	// Providing Context value states
	return (
		<>
			<MenusContext.Provider
				value={{ openId, open, close, position, setPosition }}
			>
				{children}
			</MenusContext.Provider>
		</>
	);
}

// 3. Create Children components
// Menu: parent ui real dom element.
function Menu({ children }) {
	// const { close } = useContext(MenusContext);
	// // applying clickOutside event
	// // ref={ref}
	// const ref = useClickOutside(close, true);
	return (
		<>
			<StyledMenu>{children}</StyledMenu>
		</>
	);
}
// Toggle: button to open/close the menu, child of Menu.
function Toggle({ id }) {
	const { openId, open, close, setPosition } = useContext(MenusContext);

	function handleClick(e) {
		e.stopPropagation();
		// stopping propagation to avoid triggering the clickOutside event when clicking on the toggle button, and we will handle the toggle button click event to open/close the menu at the toggle itself
		const rect = e.target.closest('button').getBoundingClientRect();

		if (openId === '' || openId !== id) {
			setPosition({
				x: window.innerWidth - rect.width - rect.x,
				y: rect.height + rect.y + 3,
			});
			open(id);
		} else {
			close();
		}

		// console.log('clicked toggle button');
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}
// List: menu list, child of Menu in react
// , and it will be rendered in a portal to the body element, so it will be rendered outside the Menu component, clicking outside the menu list will trigger the clickOutside event and close the menu list, but clicking on the toggle button will not trigger the clickOutside event because we are stopping the propagation of the click event in the toggle button click handler.
function List({ id, children }) {
	const { openId, close, position } = useContext(MenusContext);
	// applying clickOutside event
	// disabling listening in capturing phase to avoid closing the menu when clicking on the toggle button
	const ref = menusClickOutside(close, false);

	if (openId !== id) return null;

	return createPortal(
		<StyledList
			ref={ref}
			position={position}
			//
		>
			{children}
		</StyledList>,
		document.body,
	);
}
// Button: menu item button
function Button({ children, icon, onClick }) {
	const { close } = useContext(MenusContext);

	function handleClick() {
		onClick?.();
		close();
	}

	return (
		<li>
			<StyledButton onClick={handleClick}>
				{children} {icon}
			</StyledButton>
		</li>
	);
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
