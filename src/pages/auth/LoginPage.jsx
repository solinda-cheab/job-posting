import LoginForm from "../../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full">
      <h1 className="mb-2 text-center text-2xl font-bold">
        Welcome Back
      </h1>
      <p className="mb-6 text-center text-sm text-gray-600">
        Sign in to access your account
      </p>
      <LoginForm />
    </div>
  );
}

