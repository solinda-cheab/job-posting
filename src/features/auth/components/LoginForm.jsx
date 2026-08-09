import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../utils/validators";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import { useToast } from "../../../components/feedback/Toast";

export default function LoginForm() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await import(
        "../../../features/auth/api/authApi"
      ).then((mod) => mod.login(data));

      const { token, refreshToken, user } = response;

      localStorage.setItem("job_platform_token", token);

      if (refreshToken) {
        localStorage.setItem(
          "job_platform_refresh_token",
          refreshToken
        );
      }

      addToast({
        variant: "success",
        title: "Login Successful",
        description: "Welcome back!",
      });

      const rolePath = user?.role?.toLowerCase();

      navigate(
        rolePath === "applicant"
          ? ROUTES.SEEKER.DASHBOARD
          : `/${rolePath}/dashboard`
      );
    } catch (error) {
      addToast({
        variant: "error",
        title: "Login Failed",
        description:
          error.response?.data?.message ||
          "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="rounded"
          />
          Remember me
        </label>

        <Link
          to={ROUTES.HOME}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
}