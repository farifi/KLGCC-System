import { AuthProvider } from "./API Contexts Folder/AuthContext";
import { StaffProvider } from "./API Contexts Folder/StaffContext";
import { DashboardProvider } from "./API Contexts Folder/DashboardContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <StaffProvider>
        <DashboardProvider>
          {children}
        </DashboardProvider> 
      </StaffProvider>
    </AuthProvider>
  );
};

export default Providers;
