// Shown during client-side navigation to /parenting while the page loads
export default function ParentingLoading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Header skeleton */}
      <div className="text-center mb-12 animate-pulse">
        <div className="h-12 bg-gray-200 rounded-xl w-80 mx-auto mb-4" />
        <div className="h-5 bg-gray-100 rounded w-96 mx-auto mb-2" />
        <div className="h-5 bg-gray-100 rounded w-64 mx-auto" />
      </div>

      {/* Topic card grid skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl mb-4" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-100 rounded w-full mb-1" />
            <div className="h-4 bg-gray-100 rounded w-5/6 mb-5" />
            <div className="h-3 bg-gray-100 rounded w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
