import GlassCard from "./GlassCard";
import "./Components CSS files/EmployeeTable.css";

const EmployeeTable = ({ staffs = []  }) => {
  return (
    <GlassCard className="employee-table">
      <h2>STAFF</h2>
      <div className="employee-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone No</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map(stf => (
              <tr key={stf.STAFF_ID}>
                <td>{stf.STAFF_ID}</td>
                <td>{stf.FULL_NAME}</td>
                <td>{stf.EMAIL}</td>
                <td>{stf.PHONE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default EmployeeTable;
