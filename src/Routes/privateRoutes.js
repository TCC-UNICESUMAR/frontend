import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const accessToken = localStorage.getItem('accessToken');

    return accessToken !== null ? children : <Navigate to="/login" />
}