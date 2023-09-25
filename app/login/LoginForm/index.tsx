"use client";

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

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import FormIcon from "@/components/atoms/FormIcon";
import FormMessage from "@/components/atoms/FormMessage";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Toast from "@/components/molecules/Toast";
import {ApiResponse} from "@/types/ApiResponse";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
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
				const res = await fetch("/api/login", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				if (!res.ok) {
					const errRes = JSON.parse(await res.text());
					throw errRes;
				}
				router.push("/");
			} catch (error) {
				const errorData: ApiResponse = error as ApiResponse;
				if (errorData.responseDescription === "RESOURCE_NOT_FOUND") {
					setIsShowToast(true);
					setToastMessage("Username atau password tidak valid.");
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
							<FormIcon
								icon={isUnmaskPassword ? faEyeSlash : faEye}
								iconWrapperTag="button"
								onClickIcon={() => setIsUnmaskPassword((state) => !state)}
								data-testid="password-form-icon"
							>
								<Input
									id="password"
									type={isUnmaskPassword ? "text" : "password"}
									{...field}
									variant={error ? "error" : undefined}
									className="pr-10"
									data-testid="password"
								/>
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
			>
				{toastMessage}
			</Toast>
		</div>
	);
};

export default LoginForm;
