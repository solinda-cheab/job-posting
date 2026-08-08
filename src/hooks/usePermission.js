import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { roleHasPermission } from "../config/permissions";

export function usePermission(permission) {
  const { user } = useAuth();

  if (!user || !user.role) return false;
  return roleHasPermission(user.role, permission);
}

export function usePermissions(permissions = []) {
  const { user } = useAuth();

  if (!user || !user.role) {
    return {
      hasPermission: false,
      hasAllPermissions: false,
      hasAnyPermission: false,
    };
  }

  const hasPermission = (permission) => roleHasPermission(user.role, permission);
  const hasAllPermissions = permissions.every(hasPermission);
  const hasAnyPermission = permissions.some(hasPermission);

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  };
}
