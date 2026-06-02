import BaseModal from "../BaseModal";
import { useState , useEffect} from 'react';

function PatientFormModal({ isOpen, onClose, onSavePatient, patientToEdit }) {

    const isEditing = Boolean(patientToEdit);
   
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        identification: '',
        email: '',
        phone: '',
        status: 'Active' 
    });

    useEffect(() => {
        if (patientToEdit) {
            setFormData(patientToEdit);
        } else {
            setFormData({ name: '', id: '', email: '', phone: '', status: 'Active' });
        }
    }, [patientToEdit, isOpen]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        if (!formData.name || !formData.identification) {
            alert('Please fill the required fields.');
            return;
        }

        setFormData({ id: '', identification: '', name: '', email: '', phone: '', status: 'Active' });
        onSavePatient(formData);
    };

    return (

        <BaseModal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Patient" : "New Patient"}>
        
        <form onSubmit={handleSubmit}>
        <div className="modal-body">
            
            <div className="form-group">
                <label className="form-label">Full Name <span>*</span></label>
                <input 
                type="text" 
                name="name" 
                className="form-input-modal" 
                placeholder="e.g. Maria Garcia" 
                value={formData.name}
                onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Identification Number <span>*</span></label>
                <input 
                type="text" 
                name="identification" 
                className="form-input-modal" 
                placeholder="CC / TI / CE" 
                value={formData.identification}
                onChange={handleChange}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                <label className="form-label">Email Address <span>*</span></label>
                <input 
                    type="email" 
                    name="email" 
                    className="form-input-modal" 
                    placeholder="email@uni.edu.co" 
                    value={formData.email}
                    onChange={handleChange}
                />
                </div>
                <div className="form-group">
                <label className="form-label">Phone</label>
                <input 
                    type="text" 
                    name="phone" 
                    className="form-input-modal" 
                    placeholder="300 000 0000" 
                    value={formData.phone}
                    onChange={handleChange}
                />
                </div>
            </div>
            {isEditing && (
            <div className="form-group">
                <label className="form-label">Status</label>
                <select 
                    name="status" 
                    className="form-input-modal" 
                    value={formData.status} 
                    onChange={handleChange}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
          )}

        </div>

        <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">{isEditing ? "Save Changes" : "Register"}</button>
        </div>
        </form>
        </BaseModal>
    );
}

export default PatientFormModal;