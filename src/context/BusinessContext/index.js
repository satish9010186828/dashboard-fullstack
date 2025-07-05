import { createContext, useState, useContext, useCallback } from 'react';

// Create Context for business data management
const BusinessContext = createContext();

/**
 * BusinessProvider - Manages global state for business data
 * @param {Object} children - Child components to be wrapped by the provider
 */
export const BusinessProvider = ({ children }) => {
  // State for loading indicators
  const [loading, setLoading] = useState(false);
  
  // State to toggle between form and card view
  const [showCard, setShowCard] = useState(false);
  
  // State for business data
  const [businessData, setBusinessData] = useState({
    name: '',
    location: '',
    rating: 0,
    reviews: 0,
    headline: ''
  });
  
  // State for form submission errors
  const [formErrors, setFormErrors] = useState(null);

  /**
   * fetchBusinessData - Fetches business data from backend
   * @param {Object} formData - Contains businessName and location
   * 
   * https://dashboard-backend-1-2gap.onrender.com/business-data
   */ 
  const fetchBusinessData = useCallback(async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('https://dashboard-backend-1-2gap.onrender.com/business-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.businessName,
          location: formData.location
        }),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setBusinessData({
        name: formData.businessName,
        location: formData.location,
        rating: data.rating,
        reviews: data.reviews,
        headline: data.headline
      });
      setShowCard(true);
      setFormErrors(null);
    } catch (error) {
      console.error('Error fetching business data:', error);
      setFormErrors({ submit: 'Failed to fetch business data. Please try again.' });
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * regenerateHeadline - Fetches new SEO headline from backend
   */
  const regenerateHeadline = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dashboard-backend-1-2gap.onrender.com/regenerate-headline?name=${
          encodeURIComponent(businessData.name)
        }&location=${
          encodeURIComponent(businessData.location)
        }`
      );
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setBusinessData(prev => ({ ...prev, headline: data.headline }));
    } catch (error) {
      console.error('Error regenerating headline:', error);
      setFormErrors({ regenerate: 'Failed to regenerate headline. Please try again.' });
    } finally {
      setLoading(false);
    }
  }, [businessData.name, businessData.location]);

  return (
    <BusinessContext.Provider
      value={{
        loading,
        showCard,
        businessData,
        formErrors,
        fetchBusinessData,
        regenerateHeadline
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

/**
 * useBusiness - Custom hook to access business context
 * @throws {Error} If used outside BusinessProvider
 */
export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};