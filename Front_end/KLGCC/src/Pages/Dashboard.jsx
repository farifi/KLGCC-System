import { useState, useMemo } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import StatsCards from "../Components/statsCards.jsx";
import LineChartComp from "../Components/Charts/LineCharts.jsx";
import BarChartComp from "../Components/Charts/BarChart.jsx";
import PieChartComp from "../Components/Charts/PieChart.jsx";
import GlassCard from "../Components/GlassCard.jsx";
import TopCoursesLineChart from "../Components/Charts/TopCourseLineChart.jsx"
import TransactionsList from "../Components/TransactionsList.jsx"
import "./Pages CSS files/DefaultTheme.css";
// import { useDashboard } from "../API Contexts Folder/DashboardContext.jsx";

// Mock data inspired by ERD (Bookings, Courses, Equipment, Customers, Staff)
const bookingTrendData = [
  { month: "Jan", bookings: 30, revenue: 12 },
  { month: "Feb", bookings: 42, revenue: 15 },
  { month: "Mar", bookings: 55, revenue: 18 },
  { month: "Apr", bookings: 48, revenue: 16 },
  { month: "May", bookings: 63, revenue: 21 },
  { month: "Jun", bookings: 70, revenue: 25 },
  { month: "Jul", bookings: 68, revenue: 23 },
  { month: "Aug", bookings: 74, revenue: 26 },
  { month: "Sep", bookings: 60, revenue: 20 },
  { month: "Oct", bookings: 65, revenue: 22 },
  { month: "Nov", bookings: 58, revenue: 19 },
  { month: "Dec", bookings: 72, revenue: 27 },
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

const staffByPositionMock = [
  { position: "Front Desk", count: 6 },
  { position: "Caddie", count: 24 },
  { position: "Operations", count: 10 },
  { position: "Management", count: 4 },
];

const multiLineChartData = [
  { month: "Jan", courseA: 30, courseB: 20, courseC: 25 },
  { month: "Feb", courseA: 42, courseB: 28, courseC: 30 },
  { month: "Mar", courseA: 55, courseB: 36, courseC: 38 },
  { month: "Apr", courseA: 48, courseB: 32, courseC: 34 },
  { month: "May", courseA: 63, courseB: 40, courseC: 41 },
  { month: "Jun", courseA: 70, courseB: 45, courseC: 47 },
  { month: "Jul", courseA: 68, courseB: 43, courseC: 46 },
  { month: "Aug", courseA: 74, courseB: 48, courseC: 52 },
  { month: "Sep", courseA: 60, courseB: 39, courseC: 42 },
  { month: "Oct", courseA: 65, courseB: 41, courseC: 44 },
  { month: "Nov", courseA: 58, courseB: 37, courseC: 40 },
  { month: "Dec", courseA: 72, courseB: 50, courseC: 55 },
];

const transactionsMock = [
  { id: "BK-1201", type: "Booking (Member)", amount: 4323, date: "12 Dec 2023", status: "Done" },
  { id: "BK-1202", type: "Booking (Walk-in)", amount: 2890, date: "12 Dec 2023", status: "Pending" },
  { id: "EQ-2245", type: "Equipment Rental", amount: 640, date: "11 Dec 2023", status: "Done" },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // const {
  // DashboardData: {
  //   bookingTrendData,
  //   bookingsByCourse,
  //   equipmentUsage,
  //   customerTypes,
  //   staffByPosition,
  //   multiLineChartData,
  //   transactions,
  //   },
  //   Loading,
  // } = useDashboard();

  const H1Bookings = useMemo(
    () => bookingTrendData.slice(0, 6),
    [bookingTrendData]
  );

  // if (Loading) return <p>Loading dashboard...</p>


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

            <div className="dashboard-grid" style={{ minWidth: 0 }}>
              <GlassCard className="dashboard-card dashboard-card--top1" style={{ minHeight: 260 }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <LineChartComp
                    data={H1Bookings}
                    xKey="month"
                    yKey="bookings"
                    title="Bookings (H1)"
                  />
                </div>
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--top2" style={{ minHeight: 260 }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <BarChartComp
                    data={bookingsByCourse}
                    xKey="course"
                    yKey="count"
                    title="Bookings by Course"
                    barColor="#2d9cdb"
                  />
                </div>
              </GlassCard>

              {/* Equipment Rentals Pie Chart */}
              <GlassCard className="dashboard-card dashboard-card--top3" style={{ minHeight: 260 }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <PieChartComp
                    data={equipmentUsage}
                    nameKey="type"
                    valueKey="rentals"
                    title="Equipment Rentals"
                  />
                </div>
              </GlassCard>

              {/* Top 3 Courses Multi-Line Chart */}
              <GlassCard className="dashboard-card dashboard-card--main" style={{ minHeight: 300 }}>
                <h3 style={{ marginBottom: 12 }}>Top 3 Courses (Monthly)</h3>
                <div style={{ width: "100%", height: 300 }}>
                  <TopCoursesLineChart data={multiLineChartData} />
                </div>
              </GlassCard>

              {/* Customer Types Pie Chart */}
              <GlassCard className="dashboard-card dashboard-card--side1" style={{ minHeight: 260 }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <PieChartComp
                    data={customerTypes}
                    nameKey="segment"
                    valueKey="value"
                    title="Customer Types"
                    colors={["#2d9cdb", "#f5a623"]}
                  />
                </div>
              </GlassCard>

              {/* Staff by Position Bar Chart */}
              <GlassCard className="dashboard-card dashboard-card--side2" style={{ minHeight: 260 }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <BarChartComp
                    data={staffByPositionMock}
                    xKey="position"
                    yKey="count"
                    title="Staff by Position"
                    barColor="#2ecc71"
                  />
                </div>
              </GlassCard>

              {/* Transactions Table */}
              <GlassCard className="dashboard-card dashboard-card--txn" style={{ minHeight: 200 }}>
                <h3 style={{ marginBottom: 12 }}>Transactions</h3>
                <div className="transactions-grid-header">
                  <span>ID</span>
                  <span>Type</span>
                  <span>Amount</span>
                  <span>Date</span>
                  <span>Status</span>
                </div>
                <TransactionsList data={transactionsMock} />
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
