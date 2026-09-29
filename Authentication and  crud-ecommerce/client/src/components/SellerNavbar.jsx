import { NavLink, useNavigate } from "react-router";
import { LogOut, PackagePlus, ShoppingBag } from "lucide-react";
import { axiosInstance } from "../axiosinstance/axiosInstance";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SellerNavbar = () => {
  const navigate = useNavigate();
  const {setUser ,setAccessToken } =  useContext(AuthContext)

  const handleLogout =  async () => {
try {

  const res = await axiosInstance.post("/auth/logout")
  toast.success(res.data.message)
  setUser(null)
  setAccessToken("")
  navigate("/")
  
} catch (error) {


    toast.error("something went wrong")
  
}

  };

  return (
    <div className="h-screen bg-[#f7f7f5] flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

        {/* Logo */}
         <div className="shrink-0 p-4  border-b border-gray-400/80">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            snitch<span className="text-[#E98B50]">.</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-4">

          <NavLink
            to="/seller/create"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition bg-gray-100/90 ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <PackagePlus size={19} />
            Create Products
          </NavLink>

          <NavLink
            to="/seller/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition  bg-gray-100/90  ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <ShoppingBag size={19} />
            All Products
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 bg-red-500/30 rounded-xl text-sm font-medium text-red-600 hover:bg-red-400/30 transition"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>

      </aside>

   

    </div>
  );
};

export default SellerNavbar;