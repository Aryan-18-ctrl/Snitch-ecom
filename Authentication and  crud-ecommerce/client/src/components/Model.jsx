const Model = ({ onEdit, handleDeleteProductSeller, handlePublishProductSeller,handleUnPublishProductSeller  , isPublished , handleEdit}) => {
  return (
    <div
      className="absolute top-12 right-3 z-50 w-44 bg-white border border-gray-200 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-2"
      onClick={(e) => e.stopPropagation()}
    >

      {/* Edit */}
      <button
        type="button"
        onClick={handleEdit}
        className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        Edit Product
      </button>

      {/* Publish */}
     <button
    type="button"
    onClick={() =>
        isPublished
            ? handleUnPublishProductSeller () : handlePublishProductSeller()
    }
    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
>
    {isPublished ? "Unpublish Product" : "Publish Product"}
</button>

      {/* Delete */}
      <button
        type="button"
        onClick={handleDeleteProductSeller }
        className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition"
      >
        Delete Product
      </button>

    </div>
  );
};

export default Model;