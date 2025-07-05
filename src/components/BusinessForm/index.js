import { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';

/**
 * BusinessForm - Handles business information input with validation
 * @returns {JSX.Element} Form component with validation
 */
const BusinessForm = () => {
  const { loading, fetchBusinessData } = useBusiness();
  
  // Form data state
  const [formData, setFormData] = useState({
    businessName: '',
    location: ''
  });
  
  // Validation errors state
  const [errors, setErrors] = useState({
    businessName: '',
    location: ''
  });
  
  // Touched fields state (for validation timing)
  const [touched, setTouched] = useState({
    businessName: false,
    location: false
  });

  /**
   * validateField - Validates a single form field
   * @param {string} name - Field name
   * @param {string} value - Field value
   * @returns {string} Error message or empty string if valid
   */
  const validateField = (name, value) => {
    if (!value.trim()) return 'This field is required';
    if (value.length < 2) return 'Must be at least 2 characters';
    if (value.length > 50) return 'Must be less than 50 characters';
    if (/[^a-zA-Z0-9 &',.-]/.test(value)) return 'Contains invalid characters';
    return '';
  };

  /**
   * handleChange - Updates form data and validates if field was touched
   * @param {Object} e - Change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  /**
   * handleBlur - Marks field as touched and validates it
   * @param {Object} e - Blur event
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  /**
   * handleSubmit - Validates all fields and submits form if valid
   * @param {Object} e - Submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      businessName: validateField('businessName', formData.businessName),
      location: validateField('location', formData.location)
    };
    
    setErrors(newErrors);
    setTouched({ businessName: true, location: true });

    // Submit if no errors
    if (!Object.values(newErrors).some(error => error)) {
      fetchBusinessData(formData);
    }
  };

  /**
   * getInputClasses - Dynamically generates input classes based on validation state
   * @param {string} fieldName - Name of the field
   * @returns {string} Tailwind CSS classes
   */
  const getInputClasses = (fieldName) => {
    const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2';
    return errors[fieldName] && touched[fieldName]
      ? `${baseClasses} border-red-500 focus:ring-red-500`
      : `${baseClasses} border-gray-300 focus:ring-blue-500`;
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Business Dashboard</h2>
      
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Business Name Field */}
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('businessName')}
            placeholder="e.g., Cake & Co"
            aria-invalid={!!(errors.businessName && touched.businessName)}
            aria-describedby="businessName-error"
          />
          {errors.businessName && touched.businessName && (
            <p id="businessName-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.businessName}
            </p>
          )}
        </div>
        
        {/* Location Field */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClasses('location')}
            placeholder="e.g., Mumbai"
            aria-invalid={!!(errors.location && touched.location)}
            aria-describedby="location-error"
          />
          {errors.location && touched.location && (
            <p id="location-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.location}
            </p>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
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
              Loading...
            </span>
          ) : 'Get Business Data'}
        </button>
      </form>
    </div>
  );
};

export default BusinessForm;