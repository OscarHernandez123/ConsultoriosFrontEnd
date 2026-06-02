import { useContext, useEffect } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';
import { PatientContext } from '../context/PatientContext';
import { DoctorContext } from '../context/DoctorContext';
import { OfficeContext } from '../context/OfficeContext';
import { CatalogContext } from '../context/CatalogContext';

import { useApi } from '../hooks/useApi';
import { useModal } from '../hooks/useModal';
import { useFilter } from '../hooks/useFilter';
import { getAppointments, createAppointment } from '../services/appointmentApi';
import { getPatients } from '../services/patientApi';
import { getDoctors } from '../services/doctorApi';
import { getOffices } from '../services/officeApi';
import { getAppointmentTypes } from '../services/appointmentTypeApi';

import PageHeader from '../components/PageHeader';
import ApiMessage from '../components/ApiMessage';
import AppointmentList from '../components/appointments/AppointmentList';
import AppointmentFormModal from '../components/appointments/AppointmentFormModal';
import AppointmentDetailsModal from '../components/appointments/AppointmentDetailsModal';

function AppointmentsPage() {
    
    const { appointments, dispatch, loading, setLoading, error, setError, message, setMessage } = useContext(AppointmentContext);
    const { dispatch: dispatchPatients } = useContext(PatientContext);
    const { dispatch: dispatchDoctors } = useContext(DoctorContext);
    const { dispatch: dispatchOffices } = useContext(OfficeContext);
    const { dispatch: dispatchCatalogs } = useContext(CatalogContext);

    const { executeRequest } = useApi(setLoading, setError, setMessage);
    
    const formModal = useModal();
    const detailsModal = useModal();

    const { 
        searchTerm, setSearchTerm, 
        filterStatus, setFilterStatus, 
        filteredData: filteredAppointments 
    } = useFilter(appointments);

    useEffect(() => {
        loadAppointments();
        loadFormDependencies(); 
    }, []);

    async function loadAppointments() {
        const data = await executeRequest('', getAppointments);
        if (data) {
            dispatch({ type: 'SET_APPOINTMENTS', payload: data });
        }
    }

    async function loadFormDependencies() {
        try {
            const [patientsData, doctorsData, officesData, typesData] = await Promise.all([
                getPatients(),
                getDoctors(),
                getOffices(),
                getAppointmentTypes()
            ]);

            if (patientsData) dispatchPatients({ type: 'SET_PATIENTS', payload: patientsData.content || patientsData });
            if (doctorsData) dispatchDoctors({ type: 'SET_DOCTORS', payload: doctorsData.content || doctorsData });
            if (officesData) dispatchOffices({ type: 'SET_OFFICES', payload: officesData.content || officesData });
            if (typesData) dispatchCatalogs({ type: 'SET_APPOINTMENT_TYPES', payload: typesData.content || typesData });
            
        } catch (err) {
            console.error("Error loading dependencies for the form", err);
        }
    }

    async function handleSaveAppointment(appointmentData) {
        const createdAppointment = await executeRequest(
            'Appointment registered successfully!', 
            () => createAppointment(appointmentData)
        );
        if (createdAppointment) {
            dispatch({ type: 'ADD_APPOINTMENT', payload: createdAppointment });
            formModal.closeModal(); 
        }
    }

    return (
        <div className="page-content">
            <PageHeader
                title="Appointments"
                subtitle={`${filteredAppointments.length} appointments registered`}
            >   
                <div style={{display: 'flex', gap: '10px'}}>
                    <button className="btn-secondary" onClick={loadAppointments} disabled={loading}>
                        ↻ Reload
                    </button>
                    <button className="btn-primary" onClick={() => formModal.openModal()}>
                        + Add New Appointment
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
                    placeholder="Search by patient or doctor..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <select 
                    className="filter-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All statuses">All statuses</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="No Show">No Show</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>

            <AppointmentList 
                appointments={filteredAppointments} 
                openEditModal={(appointment) => detailsModal.openModal(appointment)} 
            />

            <AppointmentFormModal 
                isOpen={formModal.isOpen}
                onClose={formModal.closeModal}
                onSaveAppointment={handleSaveAppointment}
            />

            <AppointmentDetailsModal
                isOpen={detailsModal.isOpen}
                onClose={detailsModal.closeModal}
                appointment={detailsModal.selectedItem}
            />
        </div>
    );
}

export default AppointmentsPage;