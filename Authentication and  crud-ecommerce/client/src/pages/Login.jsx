import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../axiosinstance/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
    const navigate = useNavigate()

    const {setUser , setAccessToken ,accessToken} = useContext(AuthContext)


const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
} = useForm()



async function formData(data){

    try {
        
        const res = await axiosInstance.post("/auth/login" , data)

toast.success(`Welcome back ${res.data?.data?.user?.name.split(" ")[0] || "User"} ✨`);


setUser(res.data?.data?.user)
setAccessToken(res.data?.accessToken)

reset()

const role= res.data?.data?.user?.role 

if(role=="seller"){

navigate("/seller/create")

}else{
    navigate("/main/products")


}

} catch (error) {

toast.error(error.response?.data?.message)     

    }

}

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Login to continue to your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" 
        onSubmit={handleSubmit(formData)}>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>

            <input
              {...register("email", {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format"
  }
})}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
                                    {errors && <p className="text-red-600 text-sm mt-[0.5px]">{errors.email?.message }</p>}

          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
            {...register("password", {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters"
  },
  maxLength: {
    value: 20,
    message: "Password must be at most 20 characters"
  }
})}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

                                    {errors && <p className="text-red-600 text-sm mt-[0.5px]">{errors.password?.message }</p>}

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 active:scale-[0.98] transition"
          >
            Login
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-7">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-gray-900 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;