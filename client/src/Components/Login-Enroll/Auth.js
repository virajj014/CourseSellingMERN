import React from 'react';
import Cookies from 'js-cookie';
import Login from './Login';
import { Outlet, Navigate, useLocation } from 'react-router-dom'

function Auth() {

    const userdata = Cookies.get("user");
    const location = useLocation();
    location.state = location.pathname
    // console.log("this is location   "+location.pathname);
    // const pathname  = location?.state?.from?.pathname ;
    // alert(pathname)
    return (
        userdata ? <Outlet /> : <Navigate to="login" state={{ from: location }} replace />
    )
}

export default Auth