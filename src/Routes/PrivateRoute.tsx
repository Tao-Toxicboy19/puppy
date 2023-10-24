import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'
import { loginSelector } from '../store/slices/loginSlice';

export default function PrivateRoute() {
    const loginReducer = useSelector(loginSelector)

    return (
        (loginReducer.result) ? <Outlet /> : <Navigate to='/login' />
    )
} 