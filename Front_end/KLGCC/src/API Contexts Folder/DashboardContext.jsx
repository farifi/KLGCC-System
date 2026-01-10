// import { useContext, useState, useEffect, createContext } from "react";
// import API from "../Api";

// const DashboardContext = createContext();

// export const DashboardProvider = ({ children }) => {
//     const [dashboardData, setDashboardData] = useState({
//         bookingTrend: [],
//         bookingByCourse: [],
//         equimentUsage: [],
//         customerType: [],
//         staffByPosition: [],
//         multiLineBookings: [],
//         transactions: []
//     });

//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchDashboardData = async () => { 
//             try {
//                 const res = await API.get("/api/dashboard");
//                 setDashboardData(res.data);
//             } catch (error) {
//                 console.error("Dashboard API error", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchDashboardData();
//     }, []);

//     return (
//         <DashboardContext.Provider value = {{ dashboardData, loading }}>
//             {children}
//         </DashboardContext.Provider>

//     );
// };

// export const useDashboard = () => {
//     return useContext(DashboardContext);
// };