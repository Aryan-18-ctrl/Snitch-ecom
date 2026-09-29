import { Search, ShoppingCart, User, LogOut } from "lucide-react";
import { axiosInstance } from "../axiosinstance/axiosInstance";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {toast} from "react-hot-toast"
import { useNavigate } from "react-router";
import { NavLink } from "react-router";

const Navbar = () => {

    const navigate = useNavigate()

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
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#f7f7f5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-5 sm:px-8 lg:px-12">

        {/* Logo */}
        <div className="shrink-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            snitch<span className="text-[#E98B50]">.</span>
          </h1>
        </div>

        {/* Products */}
        <NavLink
        to={"/main/products"}
          type="button"
          className="hidden cursor-pointer text-sm font-medium text-gray-700 transition hover:text-[#E98B50] sm:block"
        >
          Products
        </NavLink>

        {/* Search */}
        <div className="relative ml-auto w-full max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#E98B50] focus:ring-2 focus:ring-[#E98B50]/10"
          />
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          
          {/* Cart */}
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-600 transition hover:bg-white hover:text-[#E98B50]"
          >
            <ShoppingCart size={20} />
          </button>

          {/* Profile */}
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-600 transition hover:bg-white hover:text-[#E98B50]"
          >
            <User size={20} />
          </button>

          {/* Logout */}
          <button
          onClick={handleLogout}
            type="button"
            className="ml-1 flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={17} />
            <span className="hidden md:block">Logout</span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;