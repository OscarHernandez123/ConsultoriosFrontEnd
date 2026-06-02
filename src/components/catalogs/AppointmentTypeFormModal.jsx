import { useState, useContext } from 'react';
import BaseModal from '../BaseModal';
import { CatalogContext } from '../../context/CatalogContext';
import { useApi } from '../../hooks/useApi';
import { createAppointmentType } from '../../services/appointmentTypeApi';

function AppointmentTypeFormModal({ isOpen, onClose }) {
    
    const { dispatch, setLoading, setError, setMessage } = useContext(CatalogContext);
    const { executeRequest } = useApi(setLoading, setError, setMessage);

    const [formData, setFormData] = useState({
        title: '',
        durationMinutes: 30
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.durationMinutes) {
            alert('Please fill all the required fields (*)');
            return;
        }

        const payload = {
            ...formData,
            durationMinutes: parseInt(formData.durationMinutes, 10)
        };

        const createdType = await executeRequest(
            'Appointment type registered successfully!', 
            () => createAppointmentType(payload)
        );

        if (createdType) {
            dispatch({ type: 'ADD_APPOINTMENT_TYPE', payload: createdType });
            setFormData({ title: '', durationMinutes: 30 });
            onClose();
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="New Appointment Type">
            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                    
                    <div className="form-group">
                        <label className="form-label">Appointment Name<span>*</span></label>
                        <input
                            type="text"
                            name="title"
                            className="form-input-modal"
                            placeholder="e.g. General Consultation"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Duration (Minutes)<span>*</span></label>
                        <select
                            name="durationMinutes"
                            className="form-input-modal"
                            value={formData.durationMinutes}
                            onChange={handleChange}
                        >
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={45}>45 minutes</option>
                            <option value={60}>60 minutes (1 hour)</option>
                            <option value={90}>90 minutes (1.5 hours)</option>
                        </select>
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn-primary">Register</button>
                </div>
            </form>
        </BaseModal>
    );
}

export default AppointmentTypeFormModal;