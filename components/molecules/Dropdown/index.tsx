import {
	FunctionComponent,
	HTMLAttributes,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

type DropdownMenu = {
	label: string | ReactNode;
	onClick?: () => void;
};

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
	label?: string | ReactNode;
	menus: DropdownMenu[];
	togglerClassName?: string;
};

const Dropdown: FunctionComponent<DropdownProps> = ({
	label,
	children,
	menus,
	className,
	togglerClassName,
	...attrs
}) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	const dropdownMenuRef = useRef<HTMLUListElement>(null);

	const [isShowDropdownMenu, setIsShowDropdownMenu] = useState<boolean>(false);

	const toggleDropdownMenu = useCallback(() => {
		setIsShowDropdownMenu((state) => !state);
	}, []);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Element) &&
				dropdownMenuRef.current?.classList.contains("active")
			) {
				setIsShowDropdownMenu(false);
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	return (
		<div
			className={"dropdown".concat(className ? ` ${className}` : "")}
			{...attrs}
			ref={dropdownRef}
		>
			<button
				className={"dropdown-toggler".concat(
					togglerClassName ? ` ${togglerClassName}` : "",
				)}
				onClick={toggleDropdownMenu}
			>
				{label}
			</button>
			<ul
				className={"dropdown-menu".concat(isShowDropdownMenu ? " active" : "")}
				ref={dropdownMenuRef}
			>
				{menus.map((menu, index) => (
					<li
						className="dropdown-item"
						key={index}
						onClick={() => {
							menu.onClick && menu.onClick();
							setIsShowDropdownMenu(false);
						}}
					>
						{menu.label}
					</li>
				))}
			</ul>
		</div>
	);
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
