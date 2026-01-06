import { useLocation, useNavigate } from "react-router-dom";
import { 
    LayoutDashboard, 
    ListTodo, 
    Calendar as CalendarIcon, 
    Settings, 
    Headphones, 
    TrendingUp,                    // Logo for sidebar navigation page
    Receipt, 
    FileText, 
    Users, 
    Briefcase 
} from "lucide-react";
import './Components CSS files/Sidebar.css';
import { useAuth } from "../AuthContext";
import logo from '../assets/logo_klgcc_black.png'

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const isActive = (path) => {
        // Exact match for root or dashboard
        if (path === "Dashboard" && (location.pathname === "/" || location.pathname === "/dashboard")) return true;
        if (path === "Staff" && (location.pathname === "/" || location.pathname === "/staff")) return true;
        
        const route = `/${path.toLowerCase().replace(/\s+/g, '-')}`;
        return location.pathname.startsWith(route);
    };

    const handleNavigation = (path) => {
        const route = `/${path.toLowerCase().replace(/\s+/g, '-')}`;
        navigate(route);
    };

    const mainMenuItems = [
        { label: "Dashboard", icon: LayoutDashboard },
        { label: "Staff", icon: ListTodo },
        { label: "Booking", icon: CalendarIcon },
        { label: "Equipment", icon: Settings },
    ];

    const renderMenuItem = (item) => {
        const active = isActive(item.label);
        const Icon = item.icon;
        
        return (
            <li 
                key={item.label} 
                className={active ? "active" : ""}
                onClick={() => handleNavigation(item.label)}
            >
                <Icon size={20} className="sidebar-icon" />
                <span>{item.label}</span>
            </li>
        );
    };

    const handleLogout = () => {
        logout();
        navigate("/LandingPage");
    };

    return (
        <div className="sidebar">
            <div className="logo-box">
                <img src={logo} alt="Kuala Lumpur Golf & Country Club Logo" />
            </div>

            <div className="menu-section sidebar-main-menu">
                <p className="menu-header">Main Menu</p>
                <ul>
                    {mainMenuItems.map(renderMenuItem)}
                </ul>
            </div>

            <button className="sidebar-logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Sidebar;