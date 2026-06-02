import BaseModal from "../BaseModal";

function AppointmentDetailsModal({ isOpen, onClose, appointment }) {
  if (!appointment) return null;

  const formattedDate = appointment.startAt 
    ? new Date(appointment.startAt).toLocaleDateString() 
    : appointment.date;

  const formattedTime = appointment.startAt 
    ? new Date(appointment.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    : appointment.time;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled':
      case 'Confirmed': return '#166534'; // Green
      case 'Completed': return '#0284c7'; // Blue
      case 'No Show':
      case 'Canceled':  return '#dc2626'; // Red
      default:          return '#64748b'; // Gray
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Appointment Details">
      
      <div className="modal-body">
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Patient Name</label>
            <p style={{ margin: '5px 0 15px 0', fontSize: '1.1rem', color: '#0f172a' }}>
              {appointment.patientName}
            </p>
          </div>
          <div className="form-group">
            <label className="form-label">Doctor Name</label>
            <p style={{ margin: '5px 0 15px 0', fontSize: '1.1rem', color: '#0f172a' }}>
              {appointment.doctorName}
            </p>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Office</label>
            <p style={{ margin: '5px 0 15px 0', color: '#334155' }}>
              {appointment.officeName || 'N/A'}
            </p>
          </div>
          <div className="form-group">
            <label className="form-label">Type</label>
            <p style={{ margin: '5px 0 15px 0', color: '#334155' }}>
              {appointment.appointmentTypeTitle || 'N/A'}
            </p>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date</label>
            <p style={{ margin: '5px 0 15px 0', color: '#334155' }}>
              {formattedDate}
            </p>
          </div>
          <div className="form-group">
            <label className="form-label">Time</label>
            <p style={{ margin: '5px 0 15px 0', color: '#334155' }}>
              {formattedTime}
            </p>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <p style={{ margin: '5px 0 15px 0', color: '#334155', whiteSpace: 'pre-wrap' }}>
            {appointment.notes || 'No notes provided.'}
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <p style={{ margin: '5px 0 15px 0', fontWeight: 'bold', color: getStatusColor(appointment.status) }}>
            {appointment.status}
          </p>
        </div>

      </div>

      <div className="modal-footer" style={{ justifyContent: 'center' }}>
        <button type="button" className="btn-primary" onClick={onClose}>Close</button>
      </div>

    </BaseModal>
  );
}

export default AppointmentDetailsModal;