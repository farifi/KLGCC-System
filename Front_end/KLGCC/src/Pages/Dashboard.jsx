import { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import StatsCards from "../Components/statsCards.jsx";
import KPIChart from "../Components/KPIChart.jsx";
import "./Pages CSS files/Dashboard.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="dashboard-page">
      <div className="dashboard">
        <div className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`} onClick={closeSidebar}></div>
        <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
           <Sidebar closeSidebar={closeSidebar} />
        </div>
        
        <div className="dashboard-main">
          <Header toggleSidebar={toggleSidebar} />
          <div className="dashboard-content">
            <StatsCards />
            <KPIChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
