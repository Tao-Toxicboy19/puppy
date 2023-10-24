import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { loginSelector } from "../store/slices/loginSlice";

export default function PublicRoute() {
    const loginReducer = useSelector(loginSelector);

    return (
        (loginReducer.result) ? <Navigate to='/home' /> : <Outlet />
    )
}
