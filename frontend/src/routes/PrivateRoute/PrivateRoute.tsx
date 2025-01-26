import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../routes";
import { PropsWithChildren } from "react";

export function PrivateRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN}/>
}
