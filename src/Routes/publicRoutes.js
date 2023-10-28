import { Navigate } from "react-router-dom";

export function PublicRoute({ children }) {
    const accessToken = localStorage.getItem('accessToken');

    return accessToken === null ? children : <Navigate to="/feed" />
}