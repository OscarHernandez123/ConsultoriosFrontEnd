import { useContext, useEffect, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import { useApi } from '../hooks/useApi';
import { useModal } from '../hooks/useModal';
import { useFilter} from '../hooks/useFilter';
import { getPatients, createPatient, replacePatient } from '../services/patientApi';
import PageHeader from '../components/PageHeader';
import ApiMessage from '../components/ApiMessage';
import PatientList from '../components/patients/PatientList';
import PatientFormModal from '../components/patients/PatientFormModal';
import PatientDetailsModal from '../components/patients/PatientDetailsModal';

function PatientsPage() {

    const { 
        patients, dispatch, 
        loading, setLoading, 
        error, setError, 
        message, setMessage 
    } = useContext(PatientContext);

    const { executeRequest } = useApi(setLoading, setError, setMessage);
    
    const formModal = useModal();
    const detailsModal = useModal();

    const { 
        searchTerm, setSearchTerm, 
        filterStatus, setFilterStatus, 
        filteredData: filteredPatients 
    } = useFilter(patients);

    useEffect(() => {
        loadPatients();
    }, []);

    async function loadPatients() {
        const data = await executeRequest('', getPatients);
        if (data) {
            dispatch({ type: 'SET_PATIENTS', payload: data });
        }
    }

    async function handleSavePatient(patientData) {
        if (formModal.selectedItem) {
            const updatedPatient = await executeRequest(
                '¡Patient updated successfully!', 
                () => replacePatient(patientData.id, patientData)
            );
            if (updatedPatient) {
                dispatch({ type: 'UPDATE_PATIENT', payload: updatedPatient });
                formModal.closeModal(); 
            }
        } else {
            const createdPatient = await executeRequest(
                '¡Patient registered successfully!', 
                () => createPatient(patientData)
            );
            if (createdPatient) {
                dispatch({ type: 'ADD_PATIENT', payload: createdPatient });
                formModal.closeModal(); 
            }
        }
    }

    return (
        <div className="page-content">
            <PageHeader
                title={"Patients"}
                subtitle={`${patients.length} patients found`}
            >   
                <div style={{display: 'flex', gap: '10px'}}>
                    <button className="btn-secondary" onClick={loadPatients} disabled={loading}>
                        ↻ Reload
                    </button>
                    <button className="btn-primary" onClick={() => formModal.openModal()}>
                        + Add New Patient
                    </button>
                </div>
            </PageHeader>

            <ApiMessage type="info">
                {loading ? 'Communicating with the server...' : ''}
            </ApiMessage>
            
            <ApiMessage type="success" onClose={() => setMessage('')}>
                {message}
            </ApiMessage>
            
            <ApiMessage type="error" onClose={() => setError('')}>
                {error}
            </ApiMessage>

            <div className="controls-container">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search by name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <select 
                    className="filter-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All statuses">All statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <PatientList 
                patients={filteredPatients} 
                openEditModal={(patient) => formModal.openModal(patient)}
                openDetailsModal={(patient) => detailsModal.openModal(patient)}
            />

            <PatientFormModal 
                isOpen={formModal.isOpen}
                onClose={formModal.closeModal}
                onSavePatient={handleSavePatient}
                patientToEdit={formModal.selectedItem}
            />

            <PatientDetailsModal 
                isOpen={detailsModal.isOpen}
                onClose={detailsModal.closeModal}
                patient={detailsModal.selectedItem}
                onEditClick={(patient) => {
                    detailsModal.closeModal(); 
                    formModal.openModal(patient);       
                }}
            />
        </div>
    );
}

export default PatientsPage;