import  { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'
import Loader from '../components/Loader'
const PublicProtected = () => {
    const { user ,isLoading} = useContext(AuthContext)
 if(isLoading){
        return  <Loader/>
    }
    if (user === null) {
        return <Outlet />
    }

    if (user.role === "seller") {
        return <Navigate to="/seller/create" replace />
    }

    if (user.role === "user") {
        return <Navigate to="/main/products" replace />
    }

    return <Outlet />
}  

export default PublicProtected