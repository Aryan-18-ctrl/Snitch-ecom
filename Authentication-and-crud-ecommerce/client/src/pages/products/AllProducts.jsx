import { useEffect, useState } from "react"
import { axiosInstance } from "../../axiosinstance/axiosInstance"
import SellerProductCard from "../../components/SellerProductCard"
import { useNavigate } from "react-router"
import {toast} from "react-hot-toast"
import Loader from "../../components/Loader"
import EditModel from "../../components/EditModel"
const AllProducts = () => {
const [allProducts , setAllProducts]=useState([])
const [isLoading , setIsLoading] = useState(true)
const [selectedProduct, setSelectedProduct] = useState(null);
 const navigate = useNavigate()

  async function getAllProducts(){

    try {

      const res = await axiosInstance.get("/products")
      setAllProducts(res.data.products)
      
    } catch (error) {


      console.log(error)
      
    }
    finally{
      setIsLoading(false)
    }


  }

useEffect(()=>{
    getAllProducts()

} ,[])



async function handleDeleteProductSeller(id){

try {
  const res = await axiosInstance.delete(`/products/${id}`)
  toast.success("Product deleted successfully")
      getAllProducts()

  
} catch (error) {
  console.log(error)
  toast.error("someting went wrong")
}

}


async function handlePublishProductSeller(id){
try {
  const res = await axiosInstance.patch(`/products/publish/${id}`)
  toast.success("Product published successfully")
      getAllProducts()

  
} catch (error) {
  toast.error("someting went wrong", error)
}

}

async function handleUnpublishProductSeller(id) {
  console.log(id)
    try {
        await axiosInstance.patch(`/products/unpublish/${id}`);

        toast.success("Product unpublished successfully");

        getAllProducts();

    } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
    }
}

async function handleEdit(product){

     setSelectedProduct(product)


}


if(isLoading){
  return <Loader/>
}

  return (
    <div className="h-screen bg-[#f7f7f5] px-4 py-8 overflow-auto">

      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Seller Dashboard
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 mt-1">
            All Products
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage your products and inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.map((product) => (
            <SellerProductCard
            handleDeleteProductSeller={handleDeleteProductSeller}
            handlePublishProductSeller={handlePublishProductSeller}
            handleUnPublishProductSeller={handleUnpublishProductSeller}
            handleEdit={handleEdit}

            onClick={()=>{

navigate(`/seller/detail/${product._id}`)
            }}
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>

{selectedProduct &&  <EditModel setSelectedProduct={setSelectedProduct} product={selectedProduct} getAllProducts={getAllProducts}/>
}
    </div>
 
  )
}

export default AllProducts