import {createBrowserRouter ,  RouterProvider} from "react-router"
import AuthLayout from "../Layout/AuthLayout"
import Login from "../pages/Login"
import Register from "../pages/Register"
import CreateProducts from "../pages/CreateProducts"
import SellerLayout from "../Layout/SellerLayout"
import AllProducts from "../pages/products/AllProducts"
import ProductDetails from "../pages/products/ProductDetails"
import MainLayout from "../Layout/MainLayout"
import PublicProtected from "./PublicProtected"
import AuthProtected from "./AuthPriotected"
import AllUserProducts from "../pages/products/AllUserProducts"
const AppRoutes = ()=>{

    const router  = createBrowserRouter([
        
    {
  path: "/",
  element: <PublicProtected />,
  children: [
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        }
      ]
    }
  ]
} ,


   {
    path:"/seller",
    element:<AuthProtected/>,
    children:[ {

        path:"" , 
        element:<SellerLayout/> ,
        children:[
            {

                path:"create",
                element:<CreateProducts/>
            },
            {
                path:"products" ,
                element:<AllProducts/>
            },
            {
                path:"detail/:id" ,
                element:<ProductDetails/>
            }
        ]
    } ]
   },


   {
    path:"/main",
    element:<AuthProtected/>,
    children:[ {


        path:"" ,
        element:<MainLayout/> ,
        children:[{
            path:"products" ,
            element:<AllUserProducts/>
        }
    ,

 {
                path:"detail/:id" ,
                element:<ProductDetails/>
            }]
    }]
   }

])

return (


    <RouterProvider router = {router}/>

)

}

export default AppRoutes