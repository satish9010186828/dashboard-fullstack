import BusinessForm from './components/BusinessForm';
import BusinessCard from './components/BusinessCard';
import { BusinessProvider, useBusiness } from './context/BusinessContext';

/**
 * App - Root component that manages the application layout
 * @returns {JSX.Element} Main application component
 */
function AppContent() {
  const { showCard } = useBusiness();
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {showCard ? <BusinessCard /> : <BusinessForm />}
    </div>
  );
}

/**
 * Main App wrapper that provides the business context
 */
function App() {
  return (
    <BusinessProvider>
      <AppContent />
    </BusinessProvider>
  );
}

export default App;