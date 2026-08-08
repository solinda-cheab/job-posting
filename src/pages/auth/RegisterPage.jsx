import RegisterForm from "../../features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full">
      <h1 className="mb-2 text-center text-2xl font-bold">
        Create Your Account
      </h1>
      <p className="mb-6 text-center text-sm text-gray-600">
        Join our platform to get started
      </p>
      <RegisterForm />
    </div>
  );
}

