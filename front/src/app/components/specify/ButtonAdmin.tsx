import { Navigate } from "react-router";
import { getUser } from "../../../utils/auth";
import { ReactNode } from "react";

type Role = "ADMIN" | "ANALISTA" | "USUARIO";

interface RoleBasedProps {
  roles?: Role[];
  children: ReactNode;
  redirect?: boolean;
}

export function RoleBased({
  roles = [],
  children,
  redirect = false,
}: RoleBasedProps) {
  const user = getUser();

  if (!user) {
    return redirect ? <Navigate to="/login" /> : null;
  }

  if (roles.length > 0 && !roles.includes(user.role as Role)) {
    return redirect ? <Navigate to="/" /> : null;
  }

  return <>{children}</>;
}