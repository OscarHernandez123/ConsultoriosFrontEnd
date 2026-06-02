import { useState, useContext } from 'react';
import BaseModal from '../BaseModal';
import { CatalogContext } from '../../context/CatalogContext';
import { useApi } from '../../hooks/useApi';
import { createSpecialty } from '../../services/specialtyApi';

function SpecialtyFormModal({ isOpen, onClose }) {
    
    const { dispatch, setLoading, setError, setMessage } = useContext(CatalogContext);
    const { executeRequest } = useApi(setLoading, setError, setMessage);

    const [formData, setFormData] = useState({
        title: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title) {
            alert('Please fill all the required fields (*)');
            return;
        }

        const createdSpecialty = await executeRequest(
            'Specialty registered successfully!', 
            () => createSpecialty(formData)
        );

        if (createdSpecialty) {
            dispatch({ type: 'ADD_SPECIALTY', payload: createdSpecialty });
            setFormData({ title: '' });
            onClose();
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="New Specialty">
            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                    
                    <div className="form-group">
                        <label className="form-label">Specialty Name<span>*</span></label>
                        <input
                            type="text"
                            name="title"
                            className="form-input-modal"
                            placeholder="e.g. General Medicine"
                            value={formData.title}
                            onChange={handleChange}
                        />
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

export default SpecialtyFormModal;