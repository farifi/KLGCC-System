import { Menu } from "lucide-react";

import GlassCard from "./GlassCard";
import "./Components CSS files/Header.css";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1>Dashboard</h1>
      </div>
      <GlassCard className="profile">
        <span>Carla Sanford</span>
      </GlassCard>
    </div>
  );
};

export default Header;
