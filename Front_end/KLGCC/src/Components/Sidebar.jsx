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
import logo from '../assets/logo_klgcc_black.png'

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        // Exact match for root or dashboard
        if (path === "Dashboard" && (location.pathname === "/" || location.pathname === "/dashboard")) return true;
        
        const route = `/${path.toLowerCase().replace(/\s+/g, '-')}`;
        return location.pathname.startsWith(route);
    };

    const handleNavigation = (path) => {
        const route = `/${path.toLowerCase().replace(/\s+/g, '-')}`;
        navigate(route);
    };

    const mainMenuItems = [
        { label: "Dashboard", icon: LayoutDashboard },
        { label: "Tasks", icon: ListTodo },
        { label: "Calendar", icon: CalendarIcon },
        { label: "Settings", icon: Settings },
        { label: "Support", icon: Headphones },
    ];

    const teamManagementItems = [
        { label: "Performance", icon: TrendingUp },
        { label: "Payrolls", icon: Receipt },
        { label: "Invoice", icon: FileText },
        { label: "Employees", icon: Users },
        { label: "Meeting", icon: Briefcase },
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

    return (
        <div className="sidebar">
            <div className="logo-box">
                <img src={logo} alt="Kuala Lumpur Golf & Country Club Logo" />
            </div>

            <div className="menu-section">
                <p className="menu-header">Main Menu</p>
                <ul>
                    {mainMenuItems.map(renderMenuItem)}
                </ul>
            </div>

            <div className="menu-section">
                <p className="menu-header">Team Management</p>
                <ul>
                    {teamManagementItems.map(renderMenuItem)}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;