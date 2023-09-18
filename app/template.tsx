import {FunctionComponent, HTMLAttributes} from "react";

import Navbar from "@/components/molecules/Navbar";

type TemplateProps = HTMLAttributes<HTMLDivElement>;

const Template: FunctionComponent<TemplateProps> = ({children, ...attrs}) => {
	return (
		<div {...attrs}>
			<Navbar />
			{children}
		</div>
	);
};

export default Template;
