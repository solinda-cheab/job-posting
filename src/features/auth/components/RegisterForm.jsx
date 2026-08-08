import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../utils/validators";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import { USER_ROLES } from "../../../config/constants";
import { useToast } from "../../../components/feedback/Toast";

const roleOptions = [
  { value: USER_ROLES.APPLICANT, label: "Job Seeker", description: "Find and apply to jobs" },
  { value: USER_ROLES.EMPLOYER, label: "Employer", description: "Post jobs and manage applicants" },
];

export default function RegisterForm() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(USER_ROLES.APPLICANT);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: USER_ROLES.APPLICANT,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await import("../../../features/auth/api/authApi").then(
        (mod) => mod.register(data)
      );

      addToast({
        variant: "success",
        title: "Registration Successful",
        description: "Your account has been created. Please log in.",
      });

      navigate(ROUTES.LOGIN);
    } catch (error) {
      addToast({
        variant: "error",
        title: "Registration Failed",
        description:
          error.response?.data?.message ||
          "Please check your information and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="First Name"
        placeholder="John"
        error={errors.firstName?.message}
        {...register("firstName")}
      />
      <Input
        label="Last Name"
        placeholder="Doe"
        error={errors.lastName?.message}
        {...register("lastName")}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          I want to register as:
        </label>
        <div className="flex gap-4">
          {roleOptions.map((role) => (
            <label
              key={role.value}
              className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors"
            >
              <input
                type="radio"
                name="role"
                value={role.value}
                checked={selectedRole === role.value}
                onChange={() => {
                  setSelectedRole(role.value);
                  Object.keys(register("role").onChange ? {} : {}).forEach(
                    () => {}
                  );
                }}
                {...register("role")}
                className="h-4 w-4 text-primary-600"
              />
              <div>
                <p className="font-medium">{role.label}</p>
                <p className="text-xs text-gray-500">{role.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
        helperText="Must be at least 8 characters"
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={isLoading}
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="text-primary-600 hover:text-primary-700"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
