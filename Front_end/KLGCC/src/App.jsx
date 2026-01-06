import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard'
import { AuthProvider } from './AuthContext';
import Staff from './Pages/Staff';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user == null) {
    return <Navigate to="/login"/>
  }

  return children;
};


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff" element={<Staff />}/>             
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );
};

export default App;
