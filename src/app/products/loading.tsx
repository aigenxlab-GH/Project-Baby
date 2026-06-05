// Shown during client-side navigation to /products while the page loads
export default function ProductsLoading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Header skeleton */}
      <div className="text-center mb-12 animate-pulse">
        <div className="h-12 bg-gray-200 rounded-xl w-72 mx-auto mb-4" />
        <div className="h-5 bg-gray-100 rounded w-96 mx-auto" />
      </div>

      {/* Category grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
            <div className="w-12 h-12 bg-gray-100 rounded-xl mb-4" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-100 rounded w-full mb-1" />
            <div className="h-4 bg-gray-100 rounded w-4/5 mb-4" />
            <div className="h-4 bg-gray-100 rounded w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
