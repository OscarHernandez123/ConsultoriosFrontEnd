
function DoctorList({ doctors, openEditModal, openScheduleModal }) {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Specialty</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor.id}>
                            <td>
                                <div className="cell">
                                    <div className="avatar-circle">
                                        {(doctor.fullName || "?").charAt(0).toUpperCase()}
                                    </div>
                                    <div className="details">
                                        <span className="name">{doctor.fullName || "Nombre no registrado"}</span>
                                        <span className="email" >{doctor.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="specialty-pill">
                                    {doctor.specialty?.title || 'No Specialty'}
                                </span>
                            </td>
                            <td>
                                <span className={`status-badge ${doctor.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
                                    {doctor.status}
                                </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button onClick={() => openScheduleModal(doctor)}>
                                        <span>📅 Horarios</span>
                                    </button>
                                    <button onClick={() => openEditModal(doctor)}>
                                        <span>📝</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DoctorList;