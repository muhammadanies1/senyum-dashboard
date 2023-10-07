"use client";

import axios, {AxiosError, AxiosResponse} from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {
	FunctionComponent,
	HTMLAttributes,
	useCallback,
	useState,
} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import {LoginResponse} from "@/app/api/login/route";
import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import FormIcon from "@/components/atoms/FormIcon";
import FormMessage from "@/components/atoms/FormMessage";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Toast from "@/components/molecules/Toast";
import axiosInstance from "@/config/client/axios";
import {ApiResponse} from "@/types/ApiResponse";
import {yupResolver} from "@hookform/resolvers/yup";

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
	const [isShowToast, setIsShowToast] = useState<boolean>(false);

	const [toastMessage, setToastMessage] = useState<string>();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [isUnmaskPassword, setIsUnmaskPassword] = useState<boolean>(false);

	const router = useRouter();

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

	const fetchLogin = useCallback(
		async (data: yup.InferType<typeof schema>) => {
			setIsShowToast(false);
			setToastMessage(undefined);

			try {
				setIsLoading(true);
				const res: AxiosResponse<LoginResponse> = await axiosInstance.post(
					"/api/login",
					data,
				);
				if (res?.status === 200) {
					await axiosInstance.get("/api/profile");
					router.push("/");
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const errorData: AxiosError<ApiResponse> = error;
					const responseDescription =
						errorData.response?.data.responseDescription;
					switch (responseDescription) {
						case "INVALID_USERNAME_OR_PASSWORD":
						case "RESOURCE_NOT_FOUND":
							setIsShowToast(true);
							setToastMessage("Username atau password tidak valid.");
							break;
					}
				}
			}
			setIsLoading(false);
		},
		[router],
	);

	const onSubmit = async (data: yup.InferType<typeof schema>) => {
		let timeout: NodeJS.Timeout | undefined = undefined;
		timeout && clearTimeout(timeout);
		timeout = setTimeout(() => {
			fetchLogin(data);
		}, 200);
	};

	return (
		<div
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
								placeholder="Masukkan Personal Number/NIK"
								variant={error ? "error" : undefined}
								data-testid="username"
							/>
							{error ? (
								<FormMessage
									variant="danger"
									id="username-error-message"
									data-testid="username-error-message"
								>
									{error.message}
								</FormMessage>
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
							<FormIcon data-testid="password-form-icon">
								<Input
									id="password"
									type={isUnmaskPassword ? "text" : "password"}
									{...field}
									variant={error ? "error" : undefined}
									className="pr-10"
									data-testid="password"
									placeholder="Masukkan Password"
								/>
								<button
									className="icon"
									type="button"
									onClick={() => setIsUnmaskPassword(!isUnmaskPassword)}
								>
									{isUnmaskPassword ? (
										<i className="fas fa-eye-slash"></i>
									) : (
										<i className="fas fa-eye"></i>
									)}
								</button>
							</FormIcon>
							{error ? (
								<FormMessage
									variant="danger"
									id="password-error-message"
									data-testid="password-error-message"
								>
									{error.message}
								</FormMessage>
							) : (
								false
							)}
						</FormGroup>
					)}
				/>
				<div className="text-right mt-4">
					<Link
						id="forgot-password"
						data-testid="forgot-password"
						href="#"
						className="text-primary-80 text-sm font-medium"
					>
						Lupa Password?
					</Link>
				</div>

				<Button
					size="lg"
					variant="primary"
					className="w-full mt-4"
					disabled={!isValid || isLoading}
					data-testid="submit-btn"
				>
					Masuk
				</Button>
			</form>

			<Toast
				id="toast"
				data-testid="toast"
				isShow={isShowToast}
				handleClose={() => {
					setIsShowToast(false);
				}}
				status="error"
			>
				{toastMessage}
			</Toast>
		</div>
	);
};

export default LoginForm;
