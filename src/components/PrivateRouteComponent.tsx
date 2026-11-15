import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useApplicationData } from "../context/ApplicationDataContext";

const PrivateRouteComponent = () => {
    const { isAuth, loading, user } = useApplicationData();
    const location = useLocation();

    // console.log('###',isAuth,' ',loading, ' ', user);

    if(loading) return null;
    
    if(!isAuth) return <Navigate to='/login' replace />
    
    if(user?.role === null && location.pathname !== '/select-role'){
        return <Navigate to='/select-role' replace />
    }

    if(user?.role !== null && location.pathname === '/select-role'){
        // console.log('Navigate to="/" replace />')
        return <Navigate to='/' replace />
    }

    return <Outlet />
}

export default PrivateRouteComponent;
