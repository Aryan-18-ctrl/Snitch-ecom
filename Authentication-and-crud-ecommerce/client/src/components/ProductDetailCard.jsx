import { useState } from "react";
import { ShoppingCart, Zap } from "lucide-react";

const ProductDetailCard = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const {
    title,
    description,
    images = [],
    prices,
    sizes = [],
    isPublished,
  } = product;

  const selectedSizeData = sizes.find(
    (item) => item.size === selectedSize
  );

  const stock = selectedSizeData?.stock || 0;

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 py-8">

      <div className="max-w-6xl mx-auto">

        {/* Product Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ================= IMAGES ================= */}
            <div className="p-4 sm:p-6">

              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                {images[selectedImage] && (
                  <img
                    src={images[selectedImage]}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* All Images */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-gray-900"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

              </div>

            </div>


            {/* ================= PRODUCT INFO ================= */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col">

              {/* Status */}
              {isPublished && (
                <span className="w-fit px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium mb-4">
                  In Stock
                </span>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {title}
              </h1>


              {/* Price */}
              <div className="mt-5">

                <p className="text-3xl font-semibold text-gray-900">
                  {prices?.currency === "INR" ? "₹" : "$"}
                  {prices?.amount}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Inclusive of all applicable taxes
                </p>

              </div>


              {/* Divider */}
              <div className="border-t border-gray-200 my-6" />


              {/* Description */}
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Description
                </h2>

                <p className="text-sm text-gray-600 leading-6 mt-2">
                  {description}
                </p>
              </div>


              {/* Sizes */}
              <div className="mt-7">

                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Select Size
                  </h2>

                  {selectedSize && (
                    <span className="text-xs text-gray-500">
                      {stock > 0
                        ? `${stock} available`
                        : "Out of stock"}
                    </span>
                  )}
                </div>


                <div className="flex flex-wrap gap-3 mt-3">

                  {sizes.map((item) => {

                    const outOfStock = item.stock <= 0;

                    return (
                      <button
                        key={item._id}
                        type="button"
                        disabled={outOfStock}
                        onClick={() => {
                          setSelectedSize(item.size);
                          setQuantity(1);
                        }}
                        className={`min-w-14 px-4 py-3 rounded-lg border text-sm font-medium transition ${
                          selectedSize === item.size
                            ? "bg-gray-900 text-white border-gray-900"
                            : outOfStock
                            ? "border-gray-200 text-gray-300 cursor-not-allowed"
                            : "border-gray-300 text-gray-700 hover:border-gray-900"
                        }`}
                      >
                        {item.size}
                      </button>
                    );
                  })}

                </div>

              </div>


              {/* Quantity */}
              {selectedSize && stock > 0 && (
                <div className="mt-7">

                  <h2 className="text-sm font-semibold text-gray-900">
                    Quantity
                  </h2>

                  <div className="flex items-center border border-gray-300 rounded-lg w-fit mt-3 overflow-hidden">

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="w-10 h-10 hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="w-12 text-center text-sm font-medium">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(stock, prev + 1)
                        )
                      }
                      className="w-10 h-10 hover:bg-gray-100"
                    >
                      +
                    </button>

                  </div>

                </div>
              )}


              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">

                <button
                  type="button"
                  disabled={!selectedSize || stock <= 0}
                  className="h-12 rounded-xl border border-gray-900 text-gray-900 font-medium flex items-center justify-center gap-2 hover:bg-gray-900 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ShoppingCart size={19} />
                  Add to Cart
                </button>

                <button
                  type="button"
                  disabled={!selectedSize || stock <= 0}
                  className="h-12 rounded-xl bg-gray-900 text-white font-medium flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <Zap size={18} />
                  Buy Now
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetailCard;