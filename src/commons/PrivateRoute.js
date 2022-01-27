import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = (props) => {
    let location = useLocation();
    //Check if user is logged in
    const isLoggedIn = localStorage.getItem("token") != null;
    console.log(isLoggedIn);
    if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} />;

    return <Outlet {...props} />;
};
