import {act, render, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./index";

const mockedRouterPush = jest.fn();

jest.mock("next/navigation", () => ({
	useRouter: () => {
		return {
			...jest.requireActual("next/navigation").useRouter,
			push: mockedRouterPush,
		};
	},
}));

describe("LoginForm", () => {
	test("renders login form correctly", () => {
		const {getByTestId} = render(<LoginForm data-testid="login-form" />);

		expect(getByTestId("login-form")).toBeInTheDocument();
		expect(getByTestId("username")).toBeInTheDocument();
		expect(getByTestId("password")).toBeInTheDocument();
		expect(getByTestId("submit-btn")).toBeInTheDocument();
	});

	test("renders error message when the username and password leaves blank after blur", async () => {
		const {getByTestId, findByTestId, debug} = render(<LoginForm />);

		const usernameInput = getByTestId("username");
		const passwordInput = getByTestId("password");
		const submitBtn = getByTestId("submit-btn");

		expect(submitBtn).toBeDisabled();

		userEvent.click(usernameInput);
		userEvent.click(passwordInput);
		userEvent.click(submitBtn);

		const usernameErrorMessage = await findByTestId("username-error-message");
		expect(usernameErrorMessage).toBeInTheDocument();
		expect(usernameErrorMessage).toHaveTextContent("Username harus diisi.");

		const passwordErrorMessage = await findByTestId("password-error-message");
		expect(passwordErrorMessage).toBeInTheDocument();
		expect(passwordErrorMessage).toHaveTextContent("Password harus diisi.");
	});

	test("submits login form with correct username and password", async () => {
		global.fetch = jest.fn(() => {
			return Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({
						responseCode: "0200",
						responseDescription: "SUCCESS",
						data: {
							accessToken: "accessToken",
							refreshToken: "refreshToken",
						},
					}),
			});
		}) as jest.Mock;

		const {getByTestId} = render(<LoginForm />);

		const usernameInput = getByTestId("username");
		const passwordInput = getByTestId("password");
		const submitBtn = getByTestId("submit-btn");
		const toast = getByTestId("toast");

		expect(toast).not.toHaveClass("opacity-100");
		expect(submitBtn).toBeDisabled();

		act(() => {
			userEvent.type(usernameInput, "testuser");
		});
		await waitFor(() => {
			expect(usernameInput).toHaveValue("testuser");
		});

		await waitFor(() => {
			expect(submitBtn).toBeDisabled();
		});

		await act(async () => {
			userEvent.type(passwordInput, "password");
			await waitFor(() => {
				expect(passwordInput).toHaveValue("password");
			});
		});

		await waitFor(() => {
			expect(submitBtn).not.toBeDisabled();
		});

		await act(async () => {
			userEvent.click(submitBtn);
		});

		await waitFor(() => {
			expect(mockedRouterPush).toHaveBeenCalledWith("/");
		});
	});

	test("submits login form with invalid username and password", async () => {
		global.fetch = jest.fn(() => {
			return Promise.resolve({
				ok: false,
				text: () =>
					Promise.resolve(
						JSON.stringify({
							responseCode: "0404",
							responseDescription: "RESOURCE_NOT_FOUND",
							data: null,
						}),
					),
			});
		}) as jest.Mock;

		const {getByTestId} = render(<LoginForm />);

		const usernameInput = getByTestId("username");
		const passwordInput = getByTestId("password");
		const submitBtn = getByTestId("submit-btn");
		const toast = getByTestId("toast");

		expect(toast).not.toHaveClass("opacity-100");
		expect(submitBtn).toBeDisabled();

		act(() => {
			userEvent.type(usernameInput, "invalidusername");
		});
		await waitFor(() => {
			expect(usernameInput).toHaveValue("invalidusername");
		});

		await waitFor(() => {
			expect(submitBtn).toBeDisabled();
		});

		await act(async () => {
			userEvent.type(passwordInput, "invalidpassword");
			await waitFor(() => {
				expect(passwordInput).toHaveValue("invalidpassword");
			});
		});

		await waitFor(() => {
			expect(submitBtn).not.toBeDisabled();
		});

		await act(async () => {
			userEvent.click(submitBtn);
		});

		await waitFor(() => {
			expect(toast).toHaveTextContent("Username atau password tidak valid.");
			expect(toast.parentElement).toHaveClass("flex", "opacity-100", "top-24");
			expect(toast.parentElement).toHaveClass("opacity-100");
			expect(toast.parentElement).toHaveClass("top-24");
		});

		const toastCloseBtn = toast.getElementsByClassName("toast-close-btn");
		if (!toastCloseBtn) {
			throw new Error("Element does not exist.");
		}
		await act(async () => {
			userEvent.click(toastCloseBtn[0]);
		});

		await waitFor(() => {
			expect(toast.parentElement).not.toHaveClass("opacity-100");
			expect(toast.parentElement).not.toHaveClass("flex");
			expect(toast.parentElement).not.toHaveClass("top-24");
		});
	});

	test("should toggle password field type", async () => {
		const {getByTestId} = render(<LoginForm />);

		const passwordFormIcon = getByTestId("password-form-icon");
		const passwordInputToggleBtns =
			passwordFormIcon.getElementsByClassName("icon-wrapper");

		const passwordInput = getByTestId("password");

		expect(passwordInput).toHaveAttribute("type", "password");

		if (passwordInputToggleBtns.length > 2) {
			throw new Error(
				`Expected 1 element, got ${passwordInputToggleBtns.length}.`,
			);
		} else if (passwordInputToggleBtns.length === 0) {
			throw new Error(`The element does not exist.`);
		}

		act(() => {
			userEvent.click(passwordInputToggleBtns[0]);
		});

		await waitFor(async () => {
			expect(passwordInput).toHaveAttribute("type", "text");
		});
	});

	test("renders with custom className", () => {
		const {getByTestId} = render(
			<LoginForm data-testid="login-form" className="custom-class" />,
		);
		expect(getByTestId("login-form")).toHaveClass("custom-class");
	});
});
