"use client";

import React, {
	FunctionComponent,
	useCallback,
	useEffect,
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
import Radio from "@/components/atoms/Radio";
import Modal from "@/components/molecules/Modal";
import axiosInstance from "@/config/client/axios";
import {EditUserPayload} from "@/types/EditUserPayload";
import {User} from "@/types/User";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
	id: yup.string().required(),
	deviceId: yup.string().required(),
	username: yup.string().required(),
	name: yup.string().required(),
	email: yup
		.string()
		.required("Email harus diisi.")
		.matches(
			/^[\w.]+@/,
			"Email hanya bisa memiliki kombinasi huruf kecil, angka, simbol underscore ( _ ) dan titik ( . ) sebelum @work.bri.co.id",
		)
		.test(
			"is-work-bri-email",
			"Email harus berdomain work.bri.co.id",
			function (value) {
				return value.endsWith("@work.bri.co.id");
			},
		),
	phoneNumber: yup
		.string()
		.required("Nomor Telepon harus diisi.")
		.min(7, "Nomor Telepon minimal 7 karakter.")
		.max(15, "Nomor Telepon maksimal 15 karakter.")
		.matches(
			/^\+?\d+$/,
			"Nomor Telepon hanya boleh mengandung angka dan satu plus (+) opsional.",
		),
	userTypeId: yup
		.string()
		.required("Tipe User harus dipilih.")
		.oneOf(["ADMIN", "VIEWER"], "Tipe User tidak valid."),
	password: yup
		.string()
		.optional()
		.test({
			name: "min-length",
			test: (value) => {
				if (!value || (value && value.length >= 8)) {
					return true;
				}
				return false;
			},
			message: "Password minimal 8 karakter.",
			exclusive: true,
		})
		.test({
			name: "valid-pattern",
			test: (value) => {
				if (!value || value?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]+$/)) {
					return true;
				}
				return false;
			},
			message:
				"Password harus memiliki kombinasi huruf besar, huruf kecil dan angka.",
			exclusive: true,
		}),
	passwordConfirm: yup.string().test({
		name: "password-match",
		test: function (value) {
			const password = this.parent.password;
			if (!password) {
				return true;
			}
			return value === password;
		},
		message: "Konfirmasi Password harus sama dengan Password.",
	}),
});

type EditUserProps = {
	isShow: boolean;
	handleClose: () => void;
	onSuccess: () => Promise<void>;
	onError: () => void;
	userData?: User;
};

const EditUser: FunctionComponent<EditUserProps> = ({
	isShow,
	handleClose,
	onSuccess,
	onError,
	userData,
}) => {
	const [isUnmaskPassword, setIsUnmaskPassword] = useState<boolean>(false);

	const [isUnmaskPasswordConfirmation, setIsUnmaskPasswordConfirmation] =
		useState<boolean>(false);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const initialValue: yup.InferType<typeof schema> = {
		id: userData?.id.toString() || "",
		deviceId: userData?.deviceId || "",
		username: userData?.username || "",
		name: userData?.name || "",
		email: userData?.email || "",
		phoneNumber: userData?.phoneNumber || "",
		userTypeId: userData?.userTypeId || "",
		password: "",
		passwordConfirm: "",
	};

	const {
		control,
		handleSubmit,
		reset,
		formState: {isValid},
	} = useForm({
		values: {...initialValue},
		resolver: yupResolver(schema),
		mode: "all",
	});

	const editUser = useCallback(
		async (data: yup.InferType<typeof schema>) => {
			try {
				setIsLoading(true);
				const payload: EditUserPayload = data;
				await axiosInstance.patch(`/api/user/${data.id}`, payload);
				handleClose();
				await onSuccess();
			} catch (error) {
				onError();
			}
			setIsLoading(false);
		},
		[onSuccess],
	);

	const submitForm = async (data: yup.InferType<typeof schema>) => {
		let timeout: NodeJS.Timeout | undefined = undefined;
		timeout && clearTimeout(timeout);
		timeout = setTimeout(() => {
			editUser(data);
		}, 200);
		editUser(data);
	};

	useEffect(() => {
		if (!isShow) {
			reset(initialValue);
			setIsUnmaskPassword(false);
			setIsUnmaskPasswordConfirmation(false);
		}
	}, [isShow]);

	return (
		<Modal
			id="modal-edit-form"
			data-testid="modal-edit-form"
			isShow={isShow}
			className="w-[482px]"
			onClickBackground={handleClose}
		>
			<form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
				<Modal.Header
					id="modal-edit-header"
					data-testid="modal-edit-header"
					dismissable
					handleClose={handleClose}
				>
					Edit Data User
				</Modal.Header>
				<Modal.Body id="modal-edit-body" data-testid="modal-edit-body">
					<Controller
						control={control}
						name="username"
						render={({field}) => (
							<FormGroup>
								<Label
									htmlFor="username-edit"
									aria-label="Username Label"
									data-testid="label-username-edit"
								>
									Username
								</Label>
								<Input
									id="username-edit"
									data-testid="username-edit"
									placeholder="Personal Number/NIK"
									defaultValue={field.value}
									disabled
								/>
							</FormGroup>
						)}
					/>
					<Controller
						control={control}
						name="name"
						render={({field}) => (
							<FormGroup>
								<Label
									htmlFor="name-edit"
									aria-label="Name Label"
									data-testid="label-name"
								>
									Nama
								</Label>
								<Input
									id="name-edit"
									data-testid="name-edit"
									placeholder="Nama"
									defaultValue={field.value}
									disabled
								/>
							</FormGroup>
						)}
					/>
					<Controller
						control={control}
						name="email"
						render={({field, fieldState: {error}}) => (
							<FormGroup>
								<Label
									htmlFor="email-edit"
									aria-label="Email Label"
									data-testid="Label Email Edit"
								>
									Email Kantor
								</Label>
								<Input
									id="email-edit"
									data-testid="email-edit"
									placeholder="Email berdomain @bri.co.id"
									type="email"
									{...field}
									variant={error ? "error" : undefined}
								/>
								{error?.message ? (
									<FormMessage
										id="email-error-message-edit"
										data-testid="email-error-message-edit"
										aria-label="Email Error Message Edit"
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
						name="phoneNumber"
						render={({field, fieldState: {error}}) => (
							<FormGroup>
								<Label
									htmlFor="phone-number-edit"
									aria-label="Phone Number Label"
									data-testid="label-phone-number-edit"
								>
									Nomor Telepon
								</Label>
								<Input
									id="phone-number-edit"
									data-testid="phone-number-edit"
									placeholder="Nomor Telepon"
									{...field}
									variant={error ? "error" : undefined}
								/>
								{error?.message ? (
									<FormMessage
										id="phone-number-error-message-edit"
										data-testid="phone-number-error-message-edit"
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
						name="userTypeId"
						render={({field: {value, onChange}, fieldState: {error}}) => (
							<FormGroup>
								<Label
									htmlFor="user-type-edit"
									aria-label="User Type Label"
									data-testid="label-usertype-edit"
								>
									Tipe User
								</Label>
								<div id="user-type-edit" className="flex mt-2">
									<Radio
										label="Admin"
										id="radio-admin-edit"
										data-testid="radio-admin-edit"
										name="usertype-option"
										className="w-full"
										value="ADMIN"
										checked={value === "ADMIN"}
										onChange={onChange}
									/>
									<Radio
										label="Viewer"
										id="radio-viewer-edit"
										data-testid="radio-viewer-edit"
										name="usertype-option"
										className="w-full"
										value="VIEWER"
										checked={value === "VIEWER"}
										onChange={onChange}
									/>
								</div>
								{error?.message ? (
									<FormMessage
										id="usertype-error-message-edit"
										data-testid="usertype-error-message-edit"
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
									htmlFor="password-edit"
									aria-label="Password Label"
									data-testid="label-password-edit"
								>
									Password
								</Label>
								<FormIcon data-testid="password-form-icon-edit">
									<Input
										id="password-edit"
										data-testid="password-edit"
										type={isUnmaskPassword ? "text" : "password"}
										{...field}
										variant={error ? "error" : undefined}
										className="pr-10"
									/>
									<button
										className="icon"
										type="button"
										onClick={() => setIsUnmaskPassword(!isUnmaskPassword)}
										data-testid="toggle-hide-password-edit-btn"
									>
										{isUnmaskPassword ? (
											<i className="fas fa-eye"></i>
										) : (
											<i className="fas fa-eye-slash"></i>
										)}
									</button>
								</FormIcon>
								{error?.message ? (
									<FormMessage
										id="password-error-message-edit"
										data-testid="password-error-message-edit"
										aria-label="Password Error Message Edit"
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
					<Controller
						control={control}
						name="passwordConfirm"
						render={({field, fieldState: {error}}) => (
							<FormGroup>
								<Label
									htmlFor="password-confirm-edit"
									aria-label="Password Confirm Label"
									data-testid="label-password-confirm-edit"
								>
									Konfirmasi Password
								</Label>
								<FormIcon data-testid="password-confirm-form-icon-edit">
									<Input
										id="password-confirm-edit"
										data-testid="password-confirm-edit"
										type={isUnmaskPasswordConfirmation ? "text" : "password"}
										{...field}
										variant={error ? "error" : undefined}
										className="pr-10"
									/>
									<button
										className="icon"
										type="button"
										onClick={() =>
											setIsUnmaskPasswordConfirmation(
												!isUnmaskPasswordConfirmation,
											)
										}
										data-testid="toggle-hide-password-confirm-edit-btn"
									>
										{isUnmaskPasswordConfirmation ? (
											<i className="fas fa-eye"></i>
										) : (
											<i className="fas fa-eye-slash"></i>
										)}
									</button>
								</FormIcon>
								{error?.message ? (
									<FormMessage
										id="password-confirm-error-message-edit"
										data-testid="password-confirm-error-message-edit"
										aria-label="password-confirm-error-message-edit"
										variant="danger"
										className="mt-1.5"
									>
										{error?.message}
									</FormMessage>
								) : (
									false
								)}
							</FormGroup>
						)}
					/>
				</Modal.Body>
				<Modal.Footer id="modal-edit-footer" data-testid="modal-edit-footer">
					<Button
						id="submit-modal-edit-btn"
						data-testid="submit-modal-edit-btn"
						className="w-full"
						disabled={!isValid || isLoading}
					>
						Simpan
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

export default EditUser;
