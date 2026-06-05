// Shown during client-side navigation to /blog while the page loads
export default function BlogLoading() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      {/* Header skeleton */}
      <div className="mb-12 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-xl w-24 mb-3" />
        <div className="h-5 bg-gray-100 rounded w-72" />
      </div>

      {/* Article grid skeleton */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Featured first card — wider */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
          <div className="h-72 bg-gray-100" />
          <div className="p-6 space-y-3">
            <div className="flex gap-4">
              <div className="h-3 bg-gray-100 rounded w-24" />
              <div className="h-3 bg-gray-100 rounded w-16" />
            </div>
            <div className="h-7 bg-gray-200 rounded-lg w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
          </div>
        </div>

        {/* Regular article cards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-100" />
            <div className="p-6 space-y-3">
              <div className="flex gap-4">
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-3 bg-gray-100 rounded w-14" />
              </div>
              <div className="h-6 bg-gray-200 rounded-lg w-4/5" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
