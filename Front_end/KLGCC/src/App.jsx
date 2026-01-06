import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Staff from './Pages/Staff';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/LandingPage" replace />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
        <Route path="/staff" element={ <ProtectedRoute> <Staff /> </ProtectedRoute> }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
