import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../../axiosinstance/axiosInstance";
import ProductDetailCard from "../../components/ProductDetailCard";
import Loader from "../../components/Loader";

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
const[isLoading,setIsLoading]=useState(true)
  async function getSingleProduct() {
    try {
      const res = await axiosInstance.get(`/products/${id}`);

      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  if (isLoading) {
    return (
    <Loader/>
    );
  }

  if(!product){
    return <div className="flex justify-center h-screen items-center">
      <h1 className="text-xl shadow">No Details found</h1>
    </div>
  }

  return (
    <div className="h-screen bg-[#f7f7f5] px-4 py-8 overflow-auto">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Seller Dashboard
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 mt-1">
            Product Details
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            View and manage your product information.
          </p>
        </div>

        <ProductDetailCard product={product} />

      </div>

    </div>
  );
};

export default ProductDetails;