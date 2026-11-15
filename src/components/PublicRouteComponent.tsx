import { Navigate, Outlet } from "react-router-dom"
import { useApplicationData } from "../context/ApplicationDataContext"

const PublicRouteComponent = () => {
    const {isAuth, loading} = useApplicationData();
    // console.log('isAuth=',isAuth)
    if(loading) return null;

    return isAuth ? <Navigate to='/' replace /> : <Outlet />
}

export default PublicRouteComponent;
