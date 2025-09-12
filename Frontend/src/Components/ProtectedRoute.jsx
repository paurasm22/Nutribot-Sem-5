import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../Context/AppContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AppContext); 
    console.log("isauthenticated from protected",isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;