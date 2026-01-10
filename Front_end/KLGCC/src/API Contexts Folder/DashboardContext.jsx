import { useContext, useState, useEffect, createContext } from "react";
import API from "../Api";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [dashboardData, setDashboardData] = useState({
        bookingTrend: [],
        bookingByCourse: [],
        equipmentUsage: [],
        customerType: [],
        staffByPosition: [],
        multiLineBookings: [],
        transactions: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => { 
            try {
                const [
                    bookingTrend,
                    bookingsByCourse,
                    equipmentUsage,
                    customerTypes,
                    staffByPosition,
                    topCourses,
                    transactions
                ] = await Promise.all([
                    API.get("/api/dashboard/booking-trend"),
                    API.get("/api/dashboard/bookings-by-course"),
                    API.get("/api/dashboard/equipment-usage"),
                    API.get("/api/dashboard/customer-types"),
                    API.get("/api/dashboard/staff-by-position"),
                    API.get("/api/dashboard/top-courses"),
                    API.get("/api/dashboard/transactions")
                ]);
                setDashboardData({
                    bookingTrendData: bookingTrend.data,
                    bookingsByCourse: bookingsByCourse.data,
                    equipmentUsage: equipmentUsage.data,
                    customerTypes: customerTypes.data,
                    staffByPosition: staffByPosition.data,
                    multiLineChartData: topCourses.data,
                    transactions: transactions.data
                });

            } catch (error) {
                console.error("Dashboard API error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <DashboardContext.Provider value = {{ dashboardData, loading }}>
            {children}
        </DashboardContext.Provider>

    );
};

export const useDashboard = () => {
    return useContext(DashboardContext);
};