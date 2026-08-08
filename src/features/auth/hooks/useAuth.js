import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  getCurrentUser as getCurrentUserApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
} from "../api/authApi";
import {
  TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../../config/constants";
import { jwtDecode } from "jwt-decode";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const { token, refreshToken, user } = data;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
      }
      queryClient.setQueryData(["auth", "user"], user);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUserApi,
    staleTime: 1000 * 60 * 5,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordApi,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ token, password }) =>
      resetPasswordApi(token, password),
  });
}

export function useAuth() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    user,
    token,
    isAuthenticated: !!token && !!user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    loginLoading: loginMutation.isPending,
    logoutLoading: logoutMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
}

