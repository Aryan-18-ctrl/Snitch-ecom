import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'
import { AuthContextProvider } from './context/AuthContext'
import { AxiosInterceptor } from './axiosinstance/axiosInstance'

createRoot(document.getElementById('root')).render(

<AuthContextProvider>
  <AxiosInterceptor/>
    <AppRoutes/>
  <Toaster position='top-right'/>
</AuthContextProvider>


)

