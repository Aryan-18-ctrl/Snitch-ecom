const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5]">
      <div className="flex flex-col items-center gap-4">

        {/* Loader */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />

          <div className="absolute inset-0 rounded-full border-4 border-gray-900 border-t-transparent animate-spin" />
        </div>

        {/* Text */}
        <p className="text-sm text-gray-500 font-medium">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default Loader;