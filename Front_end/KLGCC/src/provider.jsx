import { AuthProvider } from "./AuthContext";
import { StaffProvider } from "./apiContext";

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
