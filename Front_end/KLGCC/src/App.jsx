import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard'
import Employee from './Pages/Employee';
import { AuthProvider } from './AuthContext';

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
          <Route path="/employee" element={<Employee />}/>             
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );
};

export default App;
