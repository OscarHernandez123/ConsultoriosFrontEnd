
function AppointmentList({ appointments, openDetailsModal }) {

    const getStatusClass = (status) => {
        switch (status) {
            case 'Confirmed':   return 'status-active';
            case 'Completed':   return 'status-maintenance';
            case 'No Show':     return 'status-noshow';
            case 'Canceled':    return 'status-inactive';
            default:            return 'status-inactive';
        }
    };

    const isActive = (status) => status === 'Confirmed' || status === 'Pending';

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Office</th>
                        <th>Date / Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>
                                <span className="name">
                                    {appointment.patientName}
                                </span>
                            </td>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.officeName || 'Office 101'}</td>
                            <td>
                                <div className="date-cell">
                                    <span className="date-main">{appointment.date}</span>
                                    <span className="date-time">{appointment.time}</span>
                                </div>
                            </td>
                            <td>
                                <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                                    {appointment.status}
                                </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button
                                        className="action-btn"
                                        title="View details"
                                        onClick={() => openDetailsModal(appointment)}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    </button>
                                    {isActive(appointment.status) && (
                                        <>
                                            <button className="btn-apt btn-apt-complete">Complete</button>
                                            <button className="btn-apt btn-apt-noshow">No-Show</button>
                                            <button className="btn-apt btn-apt-cancel">Cancel</button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentList;