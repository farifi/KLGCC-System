import GlassCard from "./GlassCard";
import "./Components CSS files/EmployeeTable.css";

const EmployeeTable = ({ employees }) => {
  return (
    <GlassCard className="employee-table">
      <h2>Employees</h2>
      <div className="employee-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Performance</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${emp.performance}%` }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default EmployeeTable;
