import { AuthProvider } from "./API Contexts Folder/AuthContext";
import { StaffProvider } from "./API Contexts Folder/StaffContext";
import { DashboardProvider } from "./API Contexts Folder/DashboardContext";
import { BookingProvider } from "./API Contexts Folder/BookingContext";
import { EquipmentProvider } from "./API Contexts Folder/EquipmentContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <StaffProvider>
        <DashboardProvider>
          <BookingProvider>
            <EquipmentProvider>
              {children}
            </EquipmentProvider>
          </BookingProvider>
        </DashboardProvider> 
      </StaffProvider>
    </AuthProvider>
  );
};

export default Providers;
