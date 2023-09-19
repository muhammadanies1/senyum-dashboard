import Image from "next/image";
import React from "react";

import BgImageLogin from "./image-login.svg";
import LoginForm from "./LoginForm";

const Login = () => {
	return (
		<div
			className="flex flex-wrap md:flex-nowrap bg-[#EFF3F6]"
			style={{minHeight: "calc(100vh - 56px)"}}
		>
			<div className="w-full bg-white flex items-center justify-center px-4 md:px-7">
				<Image src={BgImageLogin} alt="bg-image-login" />
			</div>
			<div className="w-full flex flex-col items-center justify-center px-4 lg:px-7 gap-4 lg:gap-7 py-4 lg:py-7">
				<div className="flex-1 md:flex md:items-center">
					<LoginForm data-testid="login-form" />
				</div>
				<p className="text-center text-light-60 text-sm font-semibold">
					© 2023 SenyuM Powered by BRI | All Rights Reserved.
				</p>
			</div>
		</div>
	);
};

export default Login;
