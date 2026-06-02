import { useContext, useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { getDoctors, createDoctor, replaceDoctor } from '../services/doctorApi';
import PageHeader from '../components/PageHeader';
import ApiMessage from '../components/ApiMessage';
import { useApi } from '../hooks/useApi';
import { useModal } from '../hooks/useModal';
import { useFilter } from '../hooks/useFilter';
import DoctorList from '../components/doctors/DoctorList';
import DoctorFormModal from '../components/doctors/DoctorFormModal';
import DoctorScheduleModal from '../components/doctors/DoctorScheduleModal';

function DoctorsPage(){

    const {
        doctors, dispatch,
        loading, setLoading,
        error, setError,
        message, setMessage
    } = useContext(DoctorContext);

    const { executeRequest } = useApi(setLoading, setError, setMessage);

    const formModal = useModal();
    const scheduleModal = useModal();

    const {
        searchTerm, setSearchTerm,
        filterStatus, setFilterStatus,
        filteredData: filteredDoctors
    } = useFilter(doctors);

    useEffect(() => {
        loadDoctors();
    }, []);

    async function loadDoctors(){
        const data = await executeRequest('', getDoctors);
        if(data){
            dispatch({type: 'SET_DOCTORS', payload: data});
        }
    }

    async function handleSaveDoctor(doctorData){
        if(formModal.selectedItem){
            const updatedDoctor = await executeRequest(
                '¡Doctor updated successfully!',
                () => replaceDoctor(doctorData.id, doctorData)
            );

            if(updatedDoctor){
                loadDoctors();
                formModal.closeModal();
            }
        } else {
            const createdDoctor = await executeRequest(
                '¡Doctor registered succesfully!',
                () => createDoctor(doctorData)
            );

            if(createdDoctor){
                loadDoctors();
                formModal.closeModal();
            }
        }
    }

    return(
        <div className="page-content">
            <PageHeader
                title={"Doctors"}
                subtitle={`${filteredDoctors.length} doctors found`}
            >
                <div style={{display: 'flex', gap: '10px'}}>
                    <button className="btn-secondary" onClick={loadDoctors} disabled={loading}>
                        ↻ Reload
                    </button>
                    <button className="btn-primary" onClick={() => formModal.openModal()}>
                        + Add New Doctor
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

            <DoctorList
                doctors={filteredDoctors}
                openEditModal={(doctor) => formModal.openModal(doctor)}
                openScheduleModal={(doctor) => scheduleModal.openModal(doctor)}
            />

            <DoctorFormModal
                isOpen={formModal.isOpen}
                onClose={formModal.closeModal}
                onSaveDoctor={handleSaveDoctor}
                doctorToEdit={formModal.selectedItem} 
            />

            <DoctorScheduleModal
                isOpen={scheduleModal.isOpen}
                onClose={scheduleModal.closeModal} 
                doctor={scheduleModal.selectedItem}
                appointmentTypeId={"123e4567-e89b-12d3-a456-426614174000"}
            />
        </div>
    );
}

export default DoctorsPage;