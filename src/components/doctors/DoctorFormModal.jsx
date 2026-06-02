import BaseModal from "../BaseModal";
import { useState, useEffect, useContext } from "react";
import { CatalogContext } from "../../context/CatalogContext";

function DoctorFormModal({ isOpen, onClose, onSaveDoctor, doctorToEdit}){

    const { catalogs } = useContext(CatalogContext);
    const { specialties} = catalogs;

    const isEditing = Boolean(doctorToEdit);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        phone: '', 
        specialtyId: '',
        status: 'Active'
    });

    useEffect(() => {
        if (doctorToEdit) {
            setFormData({
                id: doctorToEdit.id || '',
                name: doctorToEdit.fullName || '',
                email: doctorToEdit.email || '',
                phone: doctorToEdit.profile?.phone || '', 
                specialtyId: doctorToEdit.specialty ? doctorToEdit.specialty.id : '',
                status: doctorToEdit.status 
            });
        } else {
            setFormData({
                id: '',
                name: '',
                email: '',
                phone: '', 
                specialtyId: '',
                status: 'Active'
            });
        }
    }, [doctorToEdit, isOpen]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value})
    }

    const handleSubmit = (e) => {
    e.preventDefault();

        if(!formData.name || !formData.email || !formData.phone || !formData.specialtyId){
            alert('Please fill all the required fields');
            return;
        }

        const payload = {
            fullName: formData.name,
            email: formData.email,
            specialtyId: String(formData.specialtyId), 
            status: (formData.status || 'ACTIVE').toUpperCase(),
            profile: {
                phone: formData.phone,
                bio: "Medical professional" 
            }
        };

        if (isEditing) {
            payload.id = formData.id;
        }

        onSaveDoctor(payload);
    }

    return(
        <BaseModal isOpen = {isOpen} onClose = {onClose} title = {isEditing ? "Edit Doctor" : "New Doctor"}>
            <form onSubmit = {handleSubmit}>
                <div className = "modal-body">
                    <div className = "form-group">
                        <label className  = "form-label">Full Name<span>*</span></label>
                        <input
                            type = "text"
                            name = "name"
                            className = "form-input-modal"
                            placeholder = "e.g. Oscar Turizo"
                            value = {formData.name}
                            onChange = {handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className = "form-group">
                            <label className = "form-label">Email Address<span>*</span></label>
                            <input
                                type = "text"
                                name = "email"
                                className = "form-input-modal"
                                placeholder = "email@uni.edu.co"
                                value = {formData.email}
                                onChange = {handleChange}
                            />                       
                        </div>

                        <div className = "form-group">
                            <label className = "form-label">Phone<span>*</span></label>
                            <input
                                type = "text"
                                name = "phone"
                                className = "form-input-modal"
                                placeholder = "3001234567"
                                value = {formData.phone}
                                onChange = {handleChange}
                            />                       
                        </div>
                    </div>

                    <div className = "form-group">
                        <label className = "form-label">Specialty<span>*</span></label>
                        <select
                            name = "specialtyId"
                            className = "form-input-modal"
                            value = {formData.specialtyId}
                            onChange = {handleChange}
                        >
                            <option value="">Select a specialty...</option>
                            {specialties.map(specialty => (
                                <option key={specialty.id} value={specialty.id}>
                                    {specialty.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {isEditing && (
                        <div className = "form-group">
                            <label className = "form-label">Status</label>
                            <select
                                name = "status"
                                className = "form-input-modal"
                                value = {formData.status}
                                onChange = {handleChange}
                            >
                                <option value = "Active">Active</option>
                                <option value = "Inactive">Inactive</option>
                            </select>
                        </div>   
                    )}
                </div>
                <div className = "modal-footer">
                    <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button type = "submit" className = "btn-primary">{isEditing ? "Save Changes" : "Register"}</button>
                </div>
            </form>
        </BaseModal>
    );
}

export default DoctorFormModal;