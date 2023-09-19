import Image from "next/image";
import React, {HTMLAttributes} from "react";
import {capitalizeEachWord} from "../../../../../utils/capitalizeEachWord";
import ChevronDownIcon from "./chevron-down-icon.svg";

type Props = HTMLAttributes<HTMLDivElement> & {userName?: string};

const NavbarProfile = (props: Props) => {
	const {className, userName, ...attrs} = props;

	return (
		<React.Fragment>
			<div
				className={"cursor-pointer flex gap-2".concat(
					className ? " " + className : "",
				)}
				{...attrs}
			>
				<p>{userName}</p>
				<p>{capitalizeEachWord(userName)}</p>
				<Image src={ChevronDownIcon} alt="Chevron Down Icon" />
			</div>
		</React.Fragment>
	);
};

export default NavbarProfile;
