
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosinstance/axiosInstance";
import UserProductCard from "../../components/UserProductCards";
import { PackageOpen, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";

const AllUserProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate()
  async function getPublishCards() {
    try {
      setIsLoading(true);
      setError(false);

      const res = await axiosInstance.get("/products/all/published");

      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error?.response?.data);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPublishCards();
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-5 py-10 text-gray-900 sm:px-8 lg:px-12">

      {/* Header */}
      <div className="mx-auto mb-10 max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#E98B50]">
              Collection
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Products
            </h1>

            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              Discover our latest products and find something that fits your
              style.
            </p>
          </div>

          {/* Product Count */}
          {!isLoading && !error && products.length > 0 && (
            <div className="w-fit rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              <span className="font-semibold text-gray-900">
                {products.length}
              </span>{" "}
              {products.length === 1 ? "Product" : "Products"}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl">

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
              >
                {/* Image skeleton */}
                <div className="h-72 animate-pulse bg-gray-100" />

                <div className="space-y-4 p-5">

                  <div className="flex justify-between gap-4">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-gray-100" />
                    <div className="h-5 w-16 animate-pulse rounded bg-gray-100" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-4/5 animate-pulse rounded bg-gray-100" />
                  </div>

                  <div className="flex gap-2">
                    <div className="h-9 w-14 animate-pulse rounded-lg bg-gray-100" />
                    <div className="h-9 w-14 animate-pulse rounded-lg bg-gray-100" />
                    <div className="h-9 w-14 animate-pulse rounded-lg bg-gray-100" />
                  </div>

                  <div className="h-11 w-full animate-pulse rounded-xl bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50">
              <PackageOpen className="h-7 w-7 text-red-400" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Something went wrong
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              We couldn't load the products right now. Please try again.
            </p>

            <button
              onClick={getPublishCards}
              className="mt-6 flex items-center gap-2 rounded-xl bg-[#E98B50] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#df7d42] active:scale-95"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        )}

        {/* No Products */}
        {!isLoading && !error && products.length === 0 && (
          <div className="flex min-h-[450px] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white px-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#E98B50]/20 bg-[#E98B50]/10">
              <PackageOpen className="h-9 w-9 text-[#E98B50]" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              No products available
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              There are no published products available at the moment.
              Please check back later for new products.
            </p>
          </div>
        )}

        {/* Products */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <UserProductCard
              onClick={()=>{
                navigate(`/main/detail/${product._id}`)
              }}
                product={product}
                key={product._id}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default AllUserProducts;