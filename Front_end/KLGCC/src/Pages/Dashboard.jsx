import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import StatsCards from "../Components/statsCards.jsx";
import KPIChart from "../Components/KPIChart.jsx";
import LineChartComp from "../Components/Charts/LineCharts.jsx";
import BarChartComp from "../Components/Charts/BarChart.jsx";
import PieChartComp from "../Components/Charts/PieChart.jsx";
import GlassCard from "../Components/GlassCard.jsx";
import { useStaff } from "../StaffContext.jsx";
import "./Pages CSS files/DefaultTheme.css";

// Mock data inspired by your ERD (Bookings, Courses, Equipment, Customers, Staff)
const bookingTrendData = [
  { month: "Jan", bookings: 30 },
  { month: "Feb", bookings: 42 },
  { month: "Mar", bookings: 55 },
  { month: "Apr", bookings: 48 },
  { month: "May", bookings: 63 },
  { month: "Jun", bookings: 70 },
];

const bookingsByCourse = [
  { course: "East Course", count: 120 },
  { course: "West Course", count: 95 },
  { course: "Championship", count: 60 },
];

const equipmentUsage = [
  { type: "Cart", rentals: 180 },
  { type: "Clubs", rentals: 75 },
  { type: "Trolleys", rentals: 110 },
];

const customerTypes = [
  { segment: "Member", value: 65 },
  { segment: "Walk-in", value: 35 },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { staffList, fetchStaffList } = useStaff();

  useEffect(() => {
    // Load real staff data for the staff-by-position chart
    fetchStaffList();
  }, [fetchStaffList]);

  // Derive staff-by-position data from real staff list; fallback to simple mock if empty
  const staffByPosition =
    staffList && staffList.length > 0
      ? Object.values(
          staffList.reduce((acc, staff) => {
            const position = staff.POSITION || "Unknown";
            if (!acc[position]) {
              acc[position] = { position, count: 0 };
            }
            acc[position].count += 1;
            return acc;
          }, {})
        )
      : [
          { position: "Front Desk", count: 6 },
          { position: "Caddie", count: 24 },
          { position: "Operations", count: 10 },
          { position: "Management", count: 4 },
        ];

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
            <StatsCards />

            <div className="dashboard-grid">
              <GlassCard className="dashboard-card dashboard-card--wide">
                <LineChartComp
                  data={bookingTrendData}
                  xKey="month"
                  yKey="bookings"
                  title="Monthly Bookings"
                />
              </GlassCard>

              <GlassCard className="dashboard-card">
                <BarChartComp
                  data={bookingsByCourse}
                  xKey="course"
                  yKey="count"
                  title="Bookings by Course"
                />
              </GlassCard>

              <GlassCard className="dashboard-card">
                <PieChartComp
                  data={equipmentUsage}
                  nameKey="type"
                  valueKey="rentals"
                  title="Equipment Rentals"
                />
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--small">
                <PieChartComp
                  data={customerTypes}
                  nameKey="segment"
                  valueKey="value"
                  title="Customer Types"
                />
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--small">
                <BarChartComp
                  data={staffByPosition}
                  xKey="position"
                  yKey="count"
                  title="Staff by Position"
                />
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--wide">
                <KPIChart />
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
