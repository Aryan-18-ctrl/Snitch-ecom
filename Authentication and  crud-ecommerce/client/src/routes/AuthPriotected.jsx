import  { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'
import Loader from "../components/Loader"
const AuthProtected = () => {
 
    const {user , isLoading} = useContext(AuthContext)

    if(isLoading){
        return  <Loader/>
    }

 
 if (user == null) {
    return <Navigate to="/" />
}



return <Outlet />
}

export default AuthProtected