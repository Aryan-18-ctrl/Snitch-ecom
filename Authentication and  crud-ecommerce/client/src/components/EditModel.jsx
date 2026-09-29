
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { axiosInstance } from "../axiosinstance/axiosInstance";
import toast from "react-hot-toast";

const EditModel = ({
  product,
  setSelectedProduct,
  getAllProducts
}) => {

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes"
  });


  // Product data ko form me fill karna

  useEffect(() => {

    if (product) {

      reset({
        title: product.title,

        description: product.description,

        prices: {
          amount: product.prices?.amount,
          currency: product.prices?.currency
        },

        sizes: product.sizes || []
      });

    }

  }, [product, reset]);


  // Update Product

  const handleUpdate = async (data) => {

    const formData = new FormData();

    formData.append("title", data.title);

    formData.append(
      "description",
      data.description
    );

    formData.append(
      "prices",
      JSON.stringify(data.prices)
    );

    formData.append(
      "sizes",
      JSON.stringify(data.sizes)
    );


    // New images
    if (data.images?.length) {

      for (const image of data.images) {
        formData.append("images", image);
      }

    }


    try {

      const res = await axiosInstance.put(
        `/products/${product._id}`,
        formData
      );


      toast.success("Product updated successfully");

      // Modal close
      setSelectedProduct(null);

      // Products refresh
      getAllProducts();

    } catch (error) {

      console.log(
        "Update Error:",
        error.response?.data
      );

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">


        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

          <div>

            <h2 className="text-xl font-semibold text-gray-900">
              Edit Product
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update your product details
            </p>

          </div>


          {/* Close */}
          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
            className="text-2xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>

        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="p-6 space-y-6"
        >


          {/* Title */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Title
            </label>

            <input
              {...register("title", {
                required: "Product title is required"
              })}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:border-gray-900 focus:bg-white"
            />

            <p className="text-red-600 text-sm mt-1">
              {errors.title?.message}
            </p>

          </div>


          {/* Description */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              {...register("description", {
                required: "Description is required"
              })}
              rows="5"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 outline-none resize-none focus:border-gray-900 focus:bg-white"
            />

            <p className="text-red-600 text-sm mt-1">
              {errors.description?.message}
            </p>

          </div>


          {/* Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


            {/* Amount */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>

              <input
                type="number"
                {...register("prices.amount", {
                  required: "Price is required",

                  min: {
                    value: 0,
                    message: "Price cannot be negative"
                  }
                })}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:border-gray-900 focus:bg-white"
              />

              <p className="text-red-600 text-sm mt-1">
                {errors.prices?.amount?.message}
              </p>

            </div>


            {/* Currency */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>

              <select
                {...register("prices.currency", {
                  required: "Currency is required"
                })}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:border-gray-900 focus:bg-white"
              >

                <option value="INR">
                  INR
                </option>

                <option value="USD">
                  USD
                </option>

              </select>

              <p className="text-red-600 text-sm mt-1">
                {errors.prices?.currency?.message}
              </p>

            </div>

          </div>


          {/* Sizes */}
          <div>

            <div className="flex items-center justify-between mb-4">

              <div>

                <h3 className="text-sm font-semibold text-gray-900">
                  Sizes & Stock
                </h3>

                <p className="text-xs text-gray-500">
                  Update available sizes and stock
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  append({
                    size: "",
                    stock: ""
                  })
                }
                className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm"
              >
                + Add Size
              </button>

            </div>


            <div className="space-y-3">

              {fields.map((field, index) => (

                <div
                  key={field.id}
                  className="flex gap-3 items-end"
                >


                  {/* Size */}
                  <div className="flex-1">

                    <label className="block text-xs text-gray-500 mb-1">
                      Size
                    </label>

                    <input
                      {...register(`sizes.${index}.size`, {
                        required: "Size is required"
                      })}
                      className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:border-gray-900 focus:bg-white"
                    />

                    <p className="text-red-600 text-xs mt-1">
                      {errors.sizes?.[index]?.size?.message}
                    </p>

                  </div>


                  {/* Stock */}
                  <div className="flex-1">

                    <label className="block text-xs text-gray-500 mb-1">
                      Stock
                    </label>

                    <input
                      type="number"
                      {...register(`sizes.${index}.stock`, {
                        required: "Stock is required",

                        min: {
                          value: 0,
                          message: "Stock cannot be negative"
                        }
                      })}
                      className="w-full h-11 px-3 rounded-lg border border-gray-300 bg-gray-50 outline-none focus:border-gray-900 focus:bg-white"
                    />

                    <p className="text-red-600 text-xs mt-1">
                      {errors.sizes?.[index]?.stock?.message}
                    </p>

                  </div>


                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="h-11 px-3 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

          </div>


          {/* Images */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add New Images
            </label>

            <input
              {...register("images")}
              type="file"
              multiple
              accept="image/*"
              className="w-full border border-gray-300 rounded-xl p-3"
            />

            <p className="text-xs text-gray-500 mt-1">
              Existing images will remain unchanged.
            </p>

          </div>


          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">


            {/* Cancel */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>


            {/* Update */}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
            >
              Update Product
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default EditModel;