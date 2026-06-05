// Shown during navigation to /pregnancy/week-by-week
export default function WeekByWeekLoading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-pulse">
        <div className="h-12 bg-gray-200 rounded-xl w-80 mx-auto mb-4" />
        <div className="h-5 bg-gray-100 rounded w-96 mx-auto" />
      </div>

      {/* Trimester sections */}
      {Array.from({ length: 3 }).map((_, t) => (
        <div key={t} className="mb-10 animate-pulse">
          <div className="h-7 bg-gray-200 rounded w-48 mb-5" />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {Array.from({ length: 14 }).map((_, w) => (
              <div key={w} className="bg-gray-100 rounded-2xl p-4 text-center">
                <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto mb-2" />
                <div className="h-4 bg-gray-200 rounded w-12 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
