import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard'
import { AuthProvider } from './AuthContext';
import Staff from './Pages/Staff';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user == null) {
    return <Navigate to="/LandingPage"/>
  }

  return children;
};


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/LandingPage" />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff" element={<Staff />}/>             
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );
};

export default App;
