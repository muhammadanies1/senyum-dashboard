import React, {HTMLAttributes} from "react";
import NavbarLogo from "../NavbarLogo";
import NavbarMenu from "../NavbarMenu";

type Props = HTMLAttributes<HTMLDivElement> & {
	token?: string;
	userName?: string;
};

const NavbarContainer = (props: Props) => {
	const {style, token, userName, ...attrs} = props;

	return (
		<>
			<div
				className="flex items-center gap-3 p-4 fixed inset-x-0 top-0 z-10 justify-between"
				style={{
					height: 56,
					width: "100%",
					backgroundColor: "var(--light-light-1, #FFF)",
					boxShadow: "0px 5px 10px 0px rgba(214, 214, 214, 0.20)",
					...style,
				}}
				{...attrs}
			>
				<NavbarLogo />
				{token && userName && <NavbarMenu userName={userName} />}
			</div>
		</>
	);
};

export default NavbarContainer;
