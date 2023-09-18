"use client";

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

const schema = yup.object({
	username: yup.string().required("Username harus diisi."),
	name: yup.string().required("Nama harus diisi."),
	email: yup
		.string()
		.required("Email harus diisi.")
		.email("Email tidak valid."),
	type: yup
		.mixed()
		.oneOf(["admin", "viewer"], "Tipe user tidak valid.")
		.required("Tipe user harus diisi."),
	password: yup
		.string()
		.required("Password harus diisi.")
		.min(6, "Password minimal 6 karakter."),
});

type Props = HTMLAttributes<HTMLDivElement>;

const ModalAddUser = (props: Props) => {
	const [isShow, setIsShow] = useState<boolean>(false);

	const {
		control,
		handleSubmit,
		formState: {isValid},
	} = useForm({
		values: {
			username: "",
			name: "",
			email: "",
			type: {},
			password: "",
		},
		resolver: yupResolver(schema),
		mode: "all",
	});

	const submitForm = (data: yup.InferType<typeof schema>) => {
		alert(`data: ${JSON.stringify(data)}`);
		setIsShow((state) => !state);
	};

	return (
		<>
			<Button
				onClick={() => setIsShow(true)}
				data-testid="show-add-user-modal-btn"
			>
				Add user
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
						Tambah User
					</Modal.Header>
					<Modal.Body id="modal-body" data-testid="modal-body">
						<Controller
							control={control}
							name="username"
							render={({field, fieldState: {error}}) => (
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
										{...field}
										variant={error ? "error" : undefined}
									/>
									{error?.message ? (
										<FormMessage variant="danger">{error?.message}</FormMessage>
									) : (
										false
									)}
								</FormGroup>
							)}
						/>
						<Controller
							control={control}
							name="name"
							render={({field, fieldState: {error}}) => (
								<FormGroup>
									<Label
										htmlFor="name"
										aria-label="Name Label"
										data-testid="label-name"
									>
										Nama
									</Label>
									<Input
										id="name"
										data-testid="name"
										placeholder="Nama"
										{...field}
										variant={error ? "error" : undefined}
									/>
									{error?.message ? (
										<FormMessage variant="danger">{error?.message}</FormMessage>
									) : (
										false
									)}
								</FormGroup>
							)}
						/>
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
										<FormMessage variant="danger">{error?.message}</FormMessage>
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
										<FormMessage variant="danger">{error?.message}</FormMessage>
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
									<Label
										htmlFor="password"
										aria-label="Password Label"
										data-testid="label-password"
									>
										Password
									</Label>
									<Input
										id="password"
										data-testid="password"
										placeholder="Password"
										type="password"
										{...field}
										variant={error ? "error" : undefined}
									/>
									{error?.message ? (
										<FormMessage variant="danger" className="mt-1.5">
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
						<div>
							<Button
								id="submit-add-user-modal-btn"
								data-testid="submit-add-user-modal-btn"
								variant="primary"
								className="w-full"
								disabled={!isValid}
							>
								Tambah User
							</Button>
						</div>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
};

export default ModalAddUser;
