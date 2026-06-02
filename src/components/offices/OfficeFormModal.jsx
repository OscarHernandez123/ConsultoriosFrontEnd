import BaseModal from "../BaseModal";
import { useState, useEffect } from "react";

function OfficeFormModal({ isOpen, onClose, onSaveOffice, officeToEdit}){

    const isEditing = Boolean(officeToEdit);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        location: '',
        status: 'Active'
    });

    useEffect(() => {
        if(officeToEdit){
            setFormData(officeToEdit);
        } else {
            setFormData({name: '', location: '', status: 'Active'})
        }
    }, [officeToEdit, isOpen])

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.name || !formData.location){
            alert("Please fill the required fields");
            return;
        }

        setFormData({name: '', location: '', status: 'Active'})
        onSaveOffice(formData)
    };

    return(
        <BaseModal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Office" : "New Office"}>
            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                    <div className="form-group">
                        <label className="form-label">Name<span>*</span></label>
                        <input
                            type="text"
                            name="name"
                            className="form-input-modal"
                            placeholder="e.g. Office 000"
                            value={formData.name}
                            onChange={handleChange}
                        />                       
                    </div>

                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="form-input-modal"
                            placeholder="e.g. Building A, First Floor"
                            value={formData.location}
                            onChange={handleChange}
                        />
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
                                <option value="Maintenance">Maintenance</option>
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

export default OfficeFormModal;