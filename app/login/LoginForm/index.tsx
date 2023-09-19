"use client";

import Image from "next/image";
import Link from "next/link";
import React, {FunctionComponent, HTMLAttributes} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import FormMessage from "@/components/atoms/FormMessage";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import {yupResolver} from "@hookform/resolvers/yup";

import EyeVisibleIcon from "./eye-visible.svg";

type LoginFormProps = HTMLAttributes<HTMLDivElement>;

const schema = yup.object({
	username: yup.string().required("Username harus diisi."),
	password: yup
		.string()
		.required("Password harus diisi.")
		.min(6, "Password minimal 6 karakter."),
});

const LoginForm: FunctionComponent<LoginFormProps> = ({
	className,
	...attrs
}) => {
	const {
		control,
		handleSubmit,
		formState: {isValid},
	} = useForm({
		values: {
			username: "",
			password: "",
		},
		resolver: yupResolver(schema),
		mode: "all",
	});

	const onSubmit = (data: yup.InferType<typeof schema>) => {
		alert(JSON.stringify(data));
	};

	return (
		<div
			data-testid="login-form"
			className={"login-form".concat(className ? ` ${className}` : "")}
			{...attrs}
		>
			<div className="text-[28px] font-semibold text-primary-90">Masuk</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="username"
					render={({field, fieldState: {error}}) => (
						<FormGroup>
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								{...field}
								variant={error ? "error" : undefined}
							/>
							{error ? (
								<FormMessage variant="danger">{error.message}</FormMessage>
							) : (
								false
							)}
						</FormGroup>
					)}
				/>
				<Controller
					control={control}
					name="password"
					render={({field, fieldState: {error}}) => (
						<FormGroup>
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									type="password"
									{...field}
									variant={error ? "error" : undefined}
									className="pr-10"
									data-testid="password"
								/>
								<button
									type="button"
									className="absolute w-5 h-5 top-3.5 right-3 z-10"
								>
									<Image
										src={EyeVisibleIcon}
										alt="eye-visible"
										width={20}
										height={20}
									/>
								</button>
							</div>
							{error ? (
								<FormMessage variant="danger">{error.message}</FormMessage>
							) : (
								false
							)}
						</FormGroup>
					)}
				/>
				<div className="text-right mt-4">
					<Link href="#" className="text-primary-80 text-sm font-medium">
						Lupa Password?
					</Link>
				</div>

				<Button
					size="lg"
					variant="primary"
					className="w-full mt-4"
					disabled={!isValid}
					data-testid="submit-btn"
				>
					Masuk
				</Button>
			</form>
		</div>
	);
};

export default LoginForm;
