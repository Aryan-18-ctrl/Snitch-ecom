import { ShoppingCart } from "lucide-react";

const UserProductCard = ({ product ,onClick }) => {
  const image = product.images?.[0]?.[0];

  return (
    <div className="group w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)]">

      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100"
      onClick={onClick}>

        <img
          src={image} 
          alt={product.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="p-5">

        <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {product.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-900">
            {product.prices?.currency === "INR" ? "₹" : "$"}
            {product.prices?.amount}
          </p>

          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#E98B50] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#df7d42] active:scale-95"
          >
            <ShoppingCart size={17} />
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserProductCard;