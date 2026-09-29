import { useForm, useFieldArray } from "react-hook-form";
import { axiosInstance } from "../axiosinstance/axiosInstance";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../components/Loader";

const CreateProducts = () => {
  const [isLoading , setIsLoading]=useState(false)

const {
  register,
  handleSubmit,
  control,
  watch,
  reset,
  formState: { errors }
} = useForm({
  mode: "onChange",
  defaultValues: {
    sizes: [
      {
        size: "",
        stock: ""
      }
    ]
  }
})

const { fields, append, remove } = useFieldArray({
  control,
  name: "sizes"
})

const images = watch("images");

  const formData = async  (data) => {


    const formData = new FormData()

    formData.append("title" ,data.title)
        formData.append("description" ,data.description)
   for (const image of data.images) {
  formData.append("images", image)
}
formData.append("prices", JSON.stringify(data.prices))
formData.append("sizes", JSON.stringify(data.sizes))

try {
  
  setIsLoading(true)

  const res = await axiosInstance.post("/products" , formData )


  toast.success("Product created successfully")

  
  reset()

} catch (error) {

  console.log(error.response?.data)
    error.response?.data?.errors?.[0]?.msg || "Something went wrong"
  
}
finally{
  setIsLoading(false)
}



  };

  return (
    <div className="h-screen bg-[#f7f7f5] px-4 py-10 overflow-auto ">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500 mb-2">
            Seller Dashboard
          </p>

          <h1 className="text-3xl font-semibold text-gray-900">
            Create Product
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Add a new product to your store
          </p>
        </div>


        {/* Form Card */}
        <form
          onSubmit={handleSubmit(formData)}
          className="bg-white border border-gray-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8"
        >

          {/* Product Information */}
          <div className="mb-8">

            <h2 className="text-lg font-semibold text-gray-900">
              Product Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Provide the basic details of your product.
            </p>

            <div className="mt-6 space-y-5">

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Title
                </label>

                <input
                  {...register("title", {
                    required: "Product title is required" ,
                     minLength:{
                    value:3,
                    message:""
                  }
                  },
                 
                
                )}
                  id="title"
                  type="text"
                  placeholder="Enter product title"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
                />

                <p className="text-red-600 text-sm mt-1">
                  {errors.title?.message}
                </p>
              </div>


              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>

                <textarea
                  {...register("description", {
                    required: "Description is required" ,
                    minLength:{
                      value:10,
                      message:"Description must be between 10 and 2000 characters"
                    },
                    maxLength:{

                           value:2000,
                      message:"Description must be between 10 and 2000 characters"
                    }


                  })}
                  id="description"
                  rows="5"
                  placeholder="Describe your product..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition resize-none focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
                />

                <p className="text-red-600 text-sm mt-1">
                  {errors.description?.message}
                </p>
              </div>

            </div>
          </div>


          {/* Product Images */}
          <div className="border-t border-gray-200 pt-8 mb-8">

            <h2 className="text-lg font-semibold text-gray-900">
              Product Images
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Upload multiple images of your product.
            </p>

            <label
              htmlFor="images"
              className="mt-6 flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 cursor-pointer hover:border-gray-900 hover:bg-white transition"
            >
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Click to upload images
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG or WEBP
                </p>
                <p>{images?.length || 0} files selected</p>
              </div>

              <input
                {...register("images", {
                  required: "Product image is required"
                })}
                id="images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
              />
            </label>

            <p className="text-red-600 text-sm mt-1">
              {errors.images?.message}
            </p>

          </div>


          {/* Pricing */}
          <div className="border-t border-gray-200 pt-8 mb-8">

            <h2 className="text-lg font-semibold text-gray-900">
              Pricing
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Set the price and currency for your product.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

              {/* Amount */}
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price
                </label>

                <input
                  {...register("prices.amount", {
                    required: "amount is required" ,
                      min: {
      value: 0,
      message: "Amount must be greater than or equal to 0"
    }
                  })}
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
                />

                <p className="text-red-600 text-sm mt-1">
                  {errors.prices?.amount?.message}
                </p>
              </div>


              {/* Currency */}
              <div>
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Currency
                </label>

                <select
                  {...register("prices.currency", {
                    required: "Currency is required"
                  })}
                  id="currency"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 outline-none transition focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
                >
                  <option value="">Select currency</option>
                  <option value="INR">INR — Indian Rupee</option>
                  <option value="USD">USD — US Dollar</option>
                </select>

                <p className="text-red-600 text-sm mt-1">
                  {errors.prices?.currency?.message}
                </p>
              </div>

            </div>
          </div>


        <div className="border-t border-gray-200 pt-8 mb-8">

  <h2 className="text-lg font-semibold text-gray-900">
    Sizes & Stock
  </h2>

  <p className="text-sm text-gray-500 mt-1">
    Add available sizes and their stock quantity.
  </p>

  {fields.map((field, index) => (
    <div
      key={field.id}
      className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
    >

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Size
        </label>

        <input
          {...register(`sizes.${index}.size`, {
            required: "Size is required"
          })}
          placeholder="M"
          className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
        />

        <p className="text-red-600 text-sm mt-1">
          {errors.sizes?.[index]?.size?.message}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stock
        </label>

        <input
          {...register(`sizes.${index}.stock`, {
            required: "Stock is required" ,
              min: {
      value: 0,
      message: "Stock cannot be negative"
    }
          })}
          type="number"
          min="0"
          placeholder="10"
          className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/10"
        />

        <p className="text-red-600 text-sm mt-1">
          {errors.sizes?.[index]?.stock?.message}
        </p>
      </div>

      <button
        type="button"
        onClick={() => remove(index)}
        className="text-red-600"
      >
        Remove
      </button>

    </div>
  ))}

  <button
    type="button"
    onClick={() => append({ size: "", stock: "" })}
    className="mt-5 px-4 py-2 rounded-lg bg-gray-900 text-white"
  >
    + Add Size
  </button>

</div>


          {/* Submit */}
          <div className="border-t border-gray-200 pt-6 flex justify-end">

            <button
              type="submit"
              className="h-12 px-8 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 active:scale-[0.98] transition"
            >
            { isLoading ?"creating": "Create product"  }
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateProducts;