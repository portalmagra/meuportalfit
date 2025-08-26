// =============================================================================
// QUIZ LOADING COMPONENT
// =============================================================================
export default function QuizLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg mx-auto max-w-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-lg mx-auto max-w-2xl"></div>
          </div>
        </div>

        {/* Quiz Card Skeleton */}
        <div className="bg-white rounded-xl shadow-soft p-8">
          <div className="animate-pulse">
            {/* Icon Skeleton */}
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
            
            {/* Title Skeleton */}
            <div className="h-8 bg-gray-200 rounded-lg mx-auto max-w-xs mb-6"></div>
            
            {/* Content Skeleton */}
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-200 rounded mx-auto max-w-lg"></div>
              <div className="h-4 bg-gray-200 rounded mx-auto max-w-md"></div>
              <div className="h-4 bg-gray-200 rounded mx-auto max-w-lg"></div>
            </div>
            
            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
            
            {/* Button Skeleton */}
            <div className="h-14 bg-gray-200 rounded-lg mx-auto max-w-xs mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mx-auto max-w-sm"></div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
            Carregando quiz personalizado...
          </div>
        </div>
      </div>
    </div>
  )
}