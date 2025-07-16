import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type Props = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />

    return children;
}

export default ProtectedRoute;