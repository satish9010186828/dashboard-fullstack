import { useBusiness } from '../../context/BusinessContext';

/**
 * BusinessCard - Displays business data and SEO information
 * @returns {JSX.Element} Card component with business data
 */
const BusinessCard = () => {
  const { businessData, loading, regenerateHeadline, formErrors } = useBusiness();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{businessData.name} Dashboard</h2>
      
      {/* Display submission errors if any */}
      {formErrors?.submit && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {formErrors.submit}
        </div>
      )}
      
      <div className="space-y-4">
        {/* Rating Display */}
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <span className="text-yellow-400 text-xl">★</span>
            <span className="ml-2 text-lg font-semibold">{businessData.rating}</span>
            <span className="ml-2 text-gray-500">({businessData.reviews} reviews)</span>
          </div>
          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            Google Rating
          </span>
        </div>
        
        {/* SEO Headline Display */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">SEO HEADLINE</h3>
          <p className="text-lg font-medium text-gray-800">{businessData.headline}</p>
        </div>
        
        {/* Display regeneration errors if any */}
        {formErrors?.regenerate && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {formErrors.regenerate}
          </div>
        )}
        
        {/* Regenerate Button */}
        <button
          onClick={regenerateHeadline}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : 'Regenerate SEO Headline'}
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;