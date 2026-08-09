import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import { ROUTES } from "../../../config/routes";

// Mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock toast
const mockAddToast = jest.fn();

jest.mock("../../../components/feedback/Toast", () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
}));

// Mock API
const mockLogin = jest.fn();

jest.mock("../../../features/auth/api/authApi", () => ({
  login: (...args) => mockLogin(...args),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderForm = () =>
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

  // 1. Email input
  test("user can enter email", async () => {
    const user = userEvent.setup();

    renderForm();

    const email = screen.getByPlaceholderText("you@example.com");

    await user.type(email, "linda@example.com");

    expect(email).toHaveValue("linda@example.com");
  });

  // 2. Password input
  test("user can enter password", async () => {
    const user = userEvent.setup();

    renderForm();

    const password = screen.getByPlaceholderText("••••••••");

    await user.type(password, "Password123");

    expect(password).toHaveValue("Password123");
  });

  // 3. Empty email
  test("shows error when email is empty", async () => {
    const user = userEvent.setup();

    renderForm();

    await user.type(
      screen.getByPlaceholderText("••••••••"),
      "Password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    expect(
      await screen.findByText("Please enter a valid email address")
    ).toBeInTheDocument();

    expect(mockLogin).not.toHaveBeenCalled();
  });

  // 4. Invalid email
  test("shows error when email format is invalid", async () => {
    const user = userEvent.setup();

    renderForm();

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "invalid-email"
    );

    await user.type(
      screen.getByPlaceholderText("••••••••"),
      "Password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    expect(
      await screen.findByText("Please enter a valid email address")
    ).toBeInTheDocument();

    expect(mockLogin).not.toHaveBeenCalled();
  });

  // 5. Empty password
  test("shows error when password is empty", async () => {
    const user = userEvent.setup();

    renderForm();

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "linda@example.com"
    );

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    expect(
      await screen.findByText("Password must be at least 8 characters")
    ).toBeInTheDocument();

    expect(mockLogin).not.toHaveBeenCalled();
  });

  // 6. Short password
  test("shows error when password is less than 8 characters", async () => {
    const user = userEvent.setup();

    renderForm();

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "linda@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("••••••••"),
      "1234567"
    );

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    expect(
      await screen.findByText("Password must be at least 8 characters")
    ).toBeInTheDocument();

    expect(mockLogin).not.toHaveBeenCalled();
  });

  // 7. Loading state
  test("shows loading state while login is processing", async () => {
    const user = userEvent.setup();

    mockLogin.mockImplementation(() => new Promise(() => {}));

    renderForm();

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "linda@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("••••••••"),
      "Password123"
    );

    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    await user.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  // 8. Button disabled during loading
  test("login button is disabled while loading", async () => {
    const user = userEvent.setup();

    mockLogin.mockImplementation(() => new Promise(() => {}));

    renderForm();

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "linda@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("••••••••"),
      "Password123"
    );

    const button = screen.getByRole("button", {
      name: /sign in/i,
    });

    expect(button).not.toBeDisabled();

    await user.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  // 9. Sign in
  test("user can click sign in", async () => {
    const user = userEvent.setup();

    mockLogin.mockResolvedValue({
      token: "token123",
      refreshToken: "refresh123",
      user: {
        role: "applicant",
      },
    });

    renderForm();

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "linda@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("••••••••"),
      "Password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  // 10. Correct login data
  test("submit function is called with correct data", async () => {
    const user = userEvent.setup();

    mockLogin.mockResolvedValue({
      token: "token123",
      refreshToken: "refresh123",
      user: {
        role: "applicant",
      },
    });

    renderForm();

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "linda@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("••••••••"),
      "Password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "linda@example.com",
        password: "Password123",
      });
    });

    expect(localStorage.getItem("job_platform_token")).toBe("token123");

    expect(mockAddToast).toHaveBeenCalledWith({
      variant: "success",
      title: "Login Successful",
      description: "Welcome back!",
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      ROUTES.SEEKER.DASHBOARD
    );
  });

  // 11. Login failure
  test("shows error message when login fails", async () => {
    const user = userEvent.setup();

    mockLogin.mockRejectedValue({
      response: {
        data: {
          message: "Invalid email or password",
        },
      },
    });

    renderForm();

    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "linda@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("••••••••"),
      "Password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    await waitFor(() => {
      expect(mockAddToast).toHaveBeenCalledWith({
        variant: "error",
        title: "Login Failed",
        description: "Invalid email or password",
      });
    });
  });
});