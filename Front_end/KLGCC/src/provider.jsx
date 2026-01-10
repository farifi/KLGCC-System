import { AuthProvider } from "./API Contexts Folder/AuthContext";
import { StaffProvider } from "./StaffContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <StaffProvider>
        {children}
      </StaffProvider>
    </AuthProvider>
  );
};

export default Providers;
