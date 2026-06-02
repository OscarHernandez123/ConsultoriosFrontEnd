import { useState, useEffect, useContext } from 'react';
import BaseModal from '../BaseModal';
import { PatientContext } from '../../context/PatientContext';
import { DoctorContext } from '../../context/DoctorContext';
import { OfficeContext } from '../../context/OfficeContext';
import { CatalogContext } from '../../context/CatalogContext';
import { getDoctorAvailability } from '../../services/availabilityApi'; 

function AppointmentFormModal({ isOpen, onClose, onSaveAppointment }) {
    
    const { patients } = useContext(PatientContext);
    const { doctors } = useContext(DoctorContext);
    const { offices } = useContext(OfficeContext);
    const { catalogs } = useContext(CatalogContext);
    
    const appointmentTypes = catalogs?.appointmentTypes || [];

    const [availableSlots, setAvailableSlots] = useState([]);

    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        officeId: '',
        appointmentTypeId: '',
        date: '',
        time: '',
        notes: '',
        status: 'Scheduled'
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                patientId: '',
                doctorId: '',
                officeId: '',
                appointmentTypeId: '',
                date: '',
                time: '',
                notes: '',
                status: 'Scheduled'
            });
            setAvailableSlots([]); 
        }
    }, [isOpen]);

    useEffect(() => {
        const fetchAvailability = async () => {
            if (formData.doctorId && formData.date && formData.appointmentTypeId) {
                try {
                    const slots = await getDoctorAvailability(
                        formData.doctorId, 
                        formData.date, 
                        formData.appointmentTypeId
                    );
                    setAvailableSlots(slots.filter(s => s.available)); 
                } catch (err) {
                    console.error("Error al obtener disponibilidad", err);
                }
            } else {
                setAvailableSlots([]); 
            }
        };
        fetchAvailability();
    }, [formData.doctorId, formData.date, formData.appointmentTypeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.patientId || !formData.doctorId || !formData.date || !formData.time) {
            alert('Please select the required fields');
            return;
        }

        const selectedPatient = patients.find(p => String(p.id) === String(formData.patientId));
        const selectedDoctor = doctors.find(d => String(d.id) === String(formData.doctorId));
        const selectedOffice = offices.find(o => String(o.id) === String(formData.officeId));
        const selectedType = appointmentTypes.find(t => String(t.id) === String(formData.appointmentTypeId));

        const combinedDateTime = new Date(`${formData.date}T${formData.time}:00`);
        const startAtInstant = combinedDateTime.toISOString(); 

        const payload = {
            patientId: formData.patientId,
            patientName: selectedPatient ? selectedPatient.name : '',
            doctorId: formData.doctorId,
            doctorName: selectedDoctor ? selectedDoctor.fullName : '',
            officeId: formData.officeId,
            officeName: selectedOffice ? selectedOffice.name : '',
            appointmentTypeId: formData.appointmentTypeId,
            appointmentTypeTitle: selectedType ? selectedType.title : '',
            startAt: startAtInstant, 
            date: formData.date, 
            time: formData.time, 
            notes: formData.notes,
            status: formData.status
        };

        onSaveAppointment(payload);
    }

    if (!isOpen) return null;

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="New Appointment">
            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                    
                    <div className="form-group">
                        <label className="form-label">Patient *</label>
                        <select 
                            name="patientId" 
                            className="form-input-modal" 
                            value={formData.patientId} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select a patient...</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Doctor *</label>
                        <select 
                            name="doctorId" 
                            className="form-input-modal" 
                            value={formData.doctorId} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select a doctor...</option>
                            {doctors.map(d => (
                                <option key={d.id} value={d.id}>{d.fullName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Office</label>
                            <select 
                                name="officeId" 
                                className="form-input-modal" 
                                value={formData.officeId} 
                                onChange={handleChange}
                            >
                                <option value="">Select an office...</option>
                                {offices.map(o => (
                                    <option key={o.id} value={o.id}>{o.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Type</label>
                            <select 
                                name="appointmentTypeId" 
                                className="form-input-modal" 
                                value={formData.appointmentTypeId} 
                                onChange={handleChange}
                            >
                                <option value="">Select type...</option>
                                {appointmentTypes.map(t => (
                                    <option key={t.id} value={t.id}>{t.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Date *</label>
                            <input 
                                type="date" 
                                name="date" 
                                className="form-input-modal" 
                                value={formData.date} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Time *</label>
                            <select 
                                name="time" 
                                className="form-input-modal" 
                                value={formData.time} 
                                onChange={handleChange} 
                                required
                                disabled={availableSlots.length === 0}
                            >
                                <option value="">{availableSlots.length > 0 ? "Select a time..." : "Select doctor/date first"}</option>
                                {availableSlots.map((slot) => (
                                    <option key={slot.time} value={slot.time}>{slot.time}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Notes (Optional)</label>
                        <textarea 
                            name="notes" 
                            rows="3" 
                            className="form-input-modal" 
                            value={formData.notes} 
                            onChange={handleChange}
                        ></textarea>
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

export default AppointmentFormModal;