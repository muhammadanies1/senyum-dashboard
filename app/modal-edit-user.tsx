"use client";

import Image from "next/image";
import React, {HTMLAttributes, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/atoms/Button";
import FormGroup from "@/components/atoms/FormGroup";
import FormMessage from "@/components/atoms/FormMessage";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Radio from "@/components/atoms/Radio";
import Modal from "@/components/molecules/Modal";
import {yupResolver} from "@hookform/resolvers/yup";

import HideVisibleIcon from "./eye-hide.svg";
import EyeVisibleIcon from "./eye-visible.svg";
import PencilIcon from "./pencil.svg";

const schema = yup.object({
	email: yup
		.string()
		.required("Email harus diisi.")
		.email("Email harus berdomain @bri.co.id")
		.test("is-bri-email", "Email harus berdomain @bri.co.id", function (value) {
			return value.endsWith("@bri.co.id");
		}),
	type: yup
		.mixed()
		.oneOf(["admin", "viewer"], "Tipe user tidak valid.")
		.required("Tipe user harus diisi."),
	password: yup
		.string()
		.required("Password harus diisi.")
		.min(8, "Password minimal 8 karakter.")
		.matches(
			/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
			"Password harus mempunyai setidaknya satu huruf, satu angka, dan satu simbol.",
		),
});

type Props = HTMLAttributes<HTMLDivElement>;

const ModalEditUser = (props: Props) => {
	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
	const [isShow, setIsShow] = useState<boolean>(false);

	const {
		control,
		handleSubmit,
		formState: {isValid},
	} = useForm({
		values: {
			email: "",
			type: {},
			password: "",
		},
		resolver: yupResolver(schema),
		mode: "all",
	});

	const handleIsShowPassword = () => {
		setIsShowPassword((state) => !state);
	};

	const submitForm = (data: yup.InferType<typeof schema>) => {
		alert(`data: ${JSON.stringify(data)}`);
		setIsShow((state) => !state);
	};

	return (
		<>
			<Button
				id="show-modal-btn"
				data-testid="show-modal-btn"
				onClick={() => setIsShow(true)}
				transparent
			>
				<Image src={PencilIcon} alt="pencil" />
			</Button>

			<Modal
				id="modal-form"
				data-testid="modal-form"
				isShow={isShow}
				className="w-[482px]"
				onClickBackground={() => setIsShow((state) => !state)}
			>
				<form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
					<Modal.Header
						id="modal-header"
						data-testid="modal-header"
						dismissable
						handleClose={() => setIsShow((state) => !state)}
					>
						Edit Data User
					</Modal.Header>
					<Modal.Body id="modal-body" data-testid="modal-body">
						<FormGroup>
							<Label
								htmlFor="username"
								aria-label="Username Label"
								data-testid="label-username"
							>
								Username
							</Label>
							<Input
								id="username"
								data-testid="username"
								placeholder="Personal Number/NIK"
								disabled
							/>
						</FormGroup>
						<FormGroup>
							<Label
								htmlFor="name"
								aria-label="Name Label"
								data-testid="label-name"
							>
								Nama
							</Label>
							<Input id="name" data-testid="name" placeholder="Nama" disabled />
						</FormGroup>
						<Controller
							control={control}
							name="email"
							render={({field, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="email"
										aria-label="Email Label"
										data-testid="label-email"
									>
										Email Kantor
									</Label>
									<Input
										id="email"
										data-testid="email"
										placeholder="Email berdomain @bri.co.id"
										type="email"
										{...field}
										variant={error ? "error" : undefined}
									/>
									{error?.message ? (
										<FormMessage
											id="email-error-message"
											data-testid="email-error-message"
											aria-label="email-error-message"
											variant="danger"
										>
											{error?.message}
										</FormMessage>
									) : (
										false
									)}
								</FormGroup>
							)}
						/>
						<Controller
							control={control}
							name="type"
							render={({field: {value, onChange}, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="user-type"
										aria-label="User Type Label"
										data-testid="label-usertype"
									>
										Tipe User
									</Label>
									<div id="user-type" className="flex mt-2">
										<Radio
											label="Admin"
											id="radio-admin"
											data-testid="radio-admin"
											name="usertype-option"
											className="w-full"
											value="admin"
											checked={value === "admin"}
											onChange={onChange}
										/>
										<Radio
											label="Viewer"
											id="radio-viewer"
											data-testid="radio-viewer"
											name="usertype-option"
											className="w-full"
											value="viewer"
											checked={value === "viewer"}
											onChange={onChange}
										/>
									</div>
									{error?.message ? (
										<FormMessage
											id="usertype-error-message"
											data-testid="usertype-error-message"
											variant="danger"
										>
											{error?.message}
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
								<FormGroup className="relative">
									<Label
										htmlFor="password"
										aria-label="Password Label"
										data-testid="label-password"
									>
										Password
									</Label>
									<div className="relative">
										<Input
											id="password"
											data-testid="password"
											placeholder="Password"
											type={isShowPassword ? "text" : "password"}
											{...field}
											variant={error ? "error" : undefined}
											className={"relative".concat(field.value ? " pr-10" : "")}
										/>
										{isShowPassword ? (
											<Image
												id="show-password-btn"
												data-testid="show-password-btn"
												src={EyeVisibleIcon}
												alt="check-circle"
												width={16}
												height={16}
												className="absolute top-[18px] right-3 hover:cursor-pointer"
												onClick={handleIsShowPassword}
											/>
										) : (
											<Image
												id="show-password-btn"
												data-testid="show-password-btn"
												src={HideVisibleIcon}
												alt="check-circle"
												width={16}
												height={16}
												className="absolute top-[18px] right-3 hover:cursor-pointer"
												onClick={handleIsShowPassword}
											/>
										)}
									</div>
									{error?.message ? (
										<FormMessage
											id="password-error-message"
											data-testid="password-error-message"
											aria-label="password-error-message"
											variant="danger"
											className="mt-1.5"
										>
											{error?.message}
										</FormMessage>
									) : (
										false
									)}
									<FormMessage>
										Min. 8 karakter serta merupakan kombinasi huruf, angka dan
										simbol
									</FormMessage>
								</FormGroup>
							)}
						/>
					</Modal.Body>
					<Modal.Footer id="modal-footer" data-testid="modal-footer">
						<Button
							id="submit-modal-btn"
							data-testid="submit-modal-btn"
							className="w-full"
							disabled={!isValid}
						>
							Simpan
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default ModalEditUser;
