export default function Loading() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-3 w-12 bg-gray-200 rounded" />
        <div className="h-3 w-3 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>

      {/* Hero skeleton */}
      <div className="h-64 bg-gray-200 rounded-2xl mb-8" />

      {/* Title skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-8 bg-gray-200 rounded-xl w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>

      {/* Meta row skeleton */}
      <div className="flex gap-6 mb-8 pb-6 border-b border-gray-100">
        <div className="h-3 w-28 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`h-4 bg-gray-200 rounded ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
        ))}
      </div>
    </div>
  );
}
