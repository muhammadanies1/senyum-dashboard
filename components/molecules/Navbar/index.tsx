"use client";

import Link from "next/link";
import React, {HTMLAttributes, useEffect, useState} from "react";

import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";

type Props = HTMLAttributes<HTMLDivElement>;

const Navbar = (props: Props) => {
	const {...attrs} = props;

	const [isExpand, setIsExpand] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			setIsExpand(false);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="navbar" {...attrs}>
			<div className="navbar-inner">
				<Link href="#">
					<NavbarLogo data-testid="navbar-logo" />
				</Link>
				<button
					className="menu-toggler"
					data-testid="menu-toggler"
					type="button"
					onClick={() => setIsExpand((state) => !state)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
					>
						<path
							d="M2 2.85714C2 2.38376 2.36631 2 2.81818 2H13.1818C13.6337 2 14 2.38376 14 2.85714C14 3.33053 13.6337 3.71429 13.1818 3.71429H2.81818C2.36631 3.71429 2 3.33053 2 2.85714Z"
							fill="#777777"
						/>
						<path
							d="M2 8C2 7.52661 2.36631 7.14286 2.81818 7.14286H13.1818C13.6337 7.14286 14 7.52661 14 8C14 8.47339 13.6337 8.85714 13.1818 8.85714H2.81818C2.36631 8.85714 2 8.47339 2 8Z"
							fill="#777777"
						/>
						<path
							d="M2 13.1429C2 12.6695 2.36631 12.2857 2.81818 12.2857H13.1818C13.6337 12.2857 14 12.6695 14 13.1429C14 13.6162 13.6337 14 13.1818 14H2.81818C2.36631 14 2 13.6162 2 13.1429Z"
							fill="#777777"
						/>
					</svg>
				</button>
				<NavbarMenu data-testid="navbar-menu" isExpand={isExpand} />
			</div>
		</div>
	);
};

export default Navbar;
