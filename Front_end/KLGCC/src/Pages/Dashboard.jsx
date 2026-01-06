import { useState } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import StatsCards from "../Components/statsCards.jsx";
import KPIChart from "../Components/KPIChart.jsx";
import LineChartComp from "../Components/Charts/LineCharts.jsx";
import BarChartComp from "../Components/Charts/BarChart.jsx";
import PieChartComp from "../Components/Charts/PieChart.jsx";
import GlassCard from "../Components/GlassCard.jsx";
import {
  LineChart as ReLineChart,
  Line as ReLine,
  XAxis as ReXAxis,
  YAxis as ReYAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer as ReResponsiveContainer,
  Legend as ReLegend,
} from "recharts";
import "./Pages CSS files/DefaultTheme.css";

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
              <GlassCard className="dashboard-card dashboard-card--top1">
                <LineChartComp
                  data={bookingTrendData.slice(0, 6)}
                  xKey="month"
                  yKey="bookings"
                  title="Bookings (H1)"
                />
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--top2">
                <BarChartComp
                  data={bookingsByCourse}
                  xKey="course"
                  yKey="count"
                  title="Bookings by Course"
                  barColor="#2d9cdb"
                />
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--top3">
                <PieChartComp
                  data={equipmentUsage}
                  nameKey="type"
                  valueKey="rentals"
                  title="Equipment Rentals"
                />
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--main">
                <h3 style={{ marginBottom: 12 }}>Top 3 Courses (Monthly)</h3>
                <ReResponsiveContainer width="100%" height={320}>
                  <ReLineChart data={multiLineChartData}>
                    <ReXAxis dataKey="month" stroke="#555555" tick={{ fill: "#555555", fontSize: 12 }} />
                    <ReYAxis stroke="#555555" tick={{ fill: "#555555", fontSize: 12 }} />
                    <ReTooltip />
                    <ReLegend />
                    <ReLine type="monotone" dataKey="courseA" stroke="#f5a623" strokeWidth={3} dot={false} name="Course A" />
                    <ReLine type="monotone" dataKey="courseB" stroke="#2d9cdb" strokeWidth={3} dot={false} name="Course B" />
                    <ReLine type="monotone" dataKey="courseC" stroke="#2ecc71" strokeWidth={3} dot={false} name="Course C" />
                  </ReLineChart>
                </ReResponsiveContainer>
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--side1">
                <PieChartComp
                  data={customerTypes}
                  nameKey="segment"
                  valueKey="value"
                  title="Customer Types"
                  colors={["#2d9cdb", "#f5a623"]}
                />
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--side2">
                <BarChartComp
                  data={staffByPositionMock}
                  xKey="position"
                  yKey="count"
                  title="Staff by Position"
                  barColor="#2ecc71"
                />
              </GlassCard>

              <GlassCard className="dashboard-card dashboard-card--txn">
                <h3 style={{ marginBottom: 12 }}>Transactions</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr", gap: "8px", fontWeight: 600, color: "#555" }}>
                  <span>ID</span>
                  <span>Type</span>
                  <span>Amount</span>
                  <span>Date</span>
                  <span>Status</span>
                </div>
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                  {transactionsMock.map((tx) => (
                    <div key={tx.id} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr", gap: "8px", alignItems: "center", fontSize: 14 }}>
                      <span>{tx.id}</span>
                      <span>{tx.type}</span>
                      <span>${tx.amount}</span>
                      <span>{tx.date}</span>
                      <span style={{ color: tx.status === "Done" ? "#2ecc71" : "#f5a623" }}>{tx.status}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
