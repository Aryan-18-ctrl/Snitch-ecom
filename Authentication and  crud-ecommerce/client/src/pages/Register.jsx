import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../axiosinstance/axiosInstance";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {

  
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors},
        watch
        

    } = useForm()



    async function formData(data){

try {

    const res = await axiosInstance.post("/auth/register" , data) 

    toast.success("Account created successfully! 🎉");

    
} catch (error) {

toast.error(error.response?.data?.message || "something went wrong")
}

        reset()
        

    }




  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 py-6">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-8">

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            Create Account
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" 
          onSubmit={handleSubmit(formData)}
>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>

            <input
          {...register("name", {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters"
  },
  maxLength: {
    value: 50,
    message: "Name must be at most 50 characters"
  }
})}
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            {errors && <p className="text-red-600 text-sm mt-[0.5px]">{errors.name?.message }</p>}
          </div>

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
              placeholder="Create a password"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

                        {errors && <p className="text-red-600 text-sm mt-[0.5px]">{errors.password?.message }</p>}

          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>

            <input

            {...register("confirmpassword", {
  required: "Confirm password is required",
  validate: (value) =>
    value === watch("password") || "Passwords do not match"
})}
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

                        {errors && <p className="text-red-600 text-sm mt-[0.5px]">{errors.confirmpassword?.message}</p>}

          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 active:scale-[0.98] transition"
          >
            Create Account
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-7">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-gray-900 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;