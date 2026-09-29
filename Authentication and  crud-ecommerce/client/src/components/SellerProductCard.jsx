import { useState } from "react";
import { MoreVertical, MoreHorizontal } from "lucide-react";

import Model from "./Model";

const SellerProductCard = ({ product, onClick , handleDeleteProductSeller , handlePublishProductSeller , handleUnPublishProductSeller , handleEdit}) => {
  const {
    title,
    description,
    images,
    isPublished,
    prices,
    sizes,
  } = product;

  const totalStock = sizes?.reduce(
    (total, item) => total + item.stock,
    0
  );

  const [open, setOpen] = useState(false);



  const image = images?.[0];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]">

      {/* Image */}
      <div
        onClick={onClick}
        className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-gray-100"
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        {/* Publish Status */}
        <div className="absolute left-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isPublished
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isPublished ? "Published" : "Draft"}
          </span>
        </div>

        {/* More Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          {open ? <MoreHorizontal size={20} /> : <MoreVertical size={20} />}
        </button>

        {/* Model */}
        {open && (
          <Model
          
          handleDeleteProductSeller={()=>{
            setOpen(false)
            handleDeleteProductSeller(product._id)
          }}
          handlePublishProductSeller={()=>{
                        setOpen(false)

            handlePublishProductSeller(product._id)
          }}

     handleUnPublishProductSeller={
     ()=>{

      handleUnPublishProductSeller(product._id)
     }
     }
     handleEdit={()=>{
           setOpen(false)

      handleEdit(product)
     }}

            className="absolute right-3 top-14 z-20"
            product={product}
            isPublished={isPublished}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
          {description}
        </p>

        {/* Price + Stock */}
        <div className="mt-5 flex items-center justify-between">

          <div>
            <p className="mb-1 text-xs text-gray-500">
              Price
            </p>

            <p className="text-lg font-semibold text-gray-900">
              {prices?.currency === "INR" ? "₹" : "$"}
              {prices?.amount}
            </p>
          </div>

          <div className="text-right">
            <p className="mb-1 text-xs text-gray-500">
              Total Stock
            </p>

            <p
              className={`text-lg font-semibold ${
                totalStock === 0
                  ? "text-red-500"
                  : "text-gray-900"
              }`}
            >
              {totalStock}
            </p>
          </div>

        </div>

        {/* Sizes */}
        <div className="mt-5 border-t border-gray-100 pt-4">

          <p className="mb-2 text-xs font-medium text-gray-500">
            Available Sizes
          </p>

          <div className="flex flex-wrap gap-2">
            {sizes?.map((item) => (
              <div
                key={item._id}
                className={`rounded-lg px-3 py-1.5 text-xs ${
                  item.stock === 0
                    ? "bg-gray-50 text-gray-400"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.size} · {item.stock}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default SellerProductCard;