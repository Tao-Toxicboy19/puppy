import LoginPage from './components/pages/LoginPage/LoginPage'
import { Route, Navigate, Routes, } from "react-router-dom";
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import { useEffect } from 'react';
import { useAppDispatch } from './store/store';
import { loginSelector, restoreLogin } from './store/slices/loginSlice';
import Header from './components/layout/Header/Header';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/pages/HomePage/HomePage';

export default function App() {
  const dispatch = useAppDispatch()
  const loginReducer = useSelector(loginSelector)

  useEffect(() => {
    dispatch(restoreLogin())
  }, []);

  return (
    <>
      {loginReducer.result && <Header />}
      <ToastContainer />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<HomePage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>

      </Routes >
    </>
  )
}