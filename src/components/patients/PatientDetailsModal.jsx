import BaseModal from "../BaseModal";

function PatientDetailsModal({ isOpen, onClose, patient, onEditClick }) {
  if (!patient) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Patient Details">
      
      <div className="modal-body">
        
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <p style={{ margin: '5px 0 15px 0', fontSize: '1.1rem', color: '#0f172a' }}>
            {patient.name}
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">Identification Number</label>
          <p style={{ margin: '5px 0 15px 0', color: '#334155' }}>
            {patient.identification}
          </p>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <p style={{ margin: '5px 0 15px 0', color: '#334155' }}>
              {patient.email}
            </p>
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <p style={{ margin: '5px 0 15px 0', color: '#334155' }}>
              {patient.phone}
            </p>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <p style={{ margin: '5px 0 15px 0', fontWeight: 'bold', color: patient.status === 'Active' ? '#166534' : '#64748b' }}>
            {patient.status}
          </p>
        </div>

      </div>

      <div className="modal-footer">
        <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
        <button type="button" className="btn-primary" onClick={() => onEditClick(patient)}>Edit</button>
      </div>

    </BaseModal>
  );
}

export default PatientDetailsModal;