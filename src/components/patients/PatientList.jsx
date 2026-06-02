
function PatientList({ patients , openEditModal, openDetailsModal}) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Identification</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>
                <div className="cell">
                  <div className="avatar-circle">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="details">
                    <span className="name">{patient.name}</span>
                    <span className="email">{patient.email}</span>
                  </div>
                </div>
              </td>
              <td>{patient.identification}</td>
              <td>{patient.phone}</td>
              <td>
                <span className={`status-badge ${patient.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                  {patient.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button onClick = {() => openDetailsModal(patient)}><span>👁️</span></button>
                  <button onClick = {() => openEditModal(patient)}><span>📝</span></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;