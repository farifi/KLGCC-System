import { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import StatsCards from "../Components/statsCards.jsx";
import KPIChart from "../Components/KPIChart.jsx";
import "./Pages CSS files/DefaultTheme.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="default-page">
      <div className="default">
        <div className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`} onClick={closeSidebar}></div>
        <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
           <Sidebar closeSidebar={closeSidebar} />
        </div>
        
        <div className="default-main">
          <Header toggleSidebar={toggleSidebar} />
          <div className="default-content">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
