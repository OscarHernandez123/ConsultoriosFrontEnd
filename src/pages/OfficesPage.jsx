import { useContext, useEffect } from 'react';
import { OfficeContext } from '../context/OfficeContext';
import { useApi } from '../hooks/useApi';
import { useModal } from '../hooks/useModal';
import { useFilter } from '../hooks/useFilter';
import { getOffices, createOffice, replaceOffice } from '../services/officeApi';
import PageHeader from '../components/PageHeader';
import ApiMessage from '../components/ApiMessage';
import OfficeList from '../components/offices/OfficeList';
import OfficeFormModal from '../components/offices/OfficeFormModal';

function OfficesPage() {

    const { 
        offices, dispatch, 
        loading, setLoading, 
        error, setError, 
        message, setMessage 
    } = useContext(OfficeContext);

    const { executeRequest } = useApi(setLoading, setError, setMessage);
    
    const formModal = useModal();

    const { 
        searchTerm, setSearchTerm, 
        filterStatus, setFilterStatus, 
        filteredData: filteredOffices 
    } = useFilter(offices);

    useEffect(() => {
        loadOffices();
    }, []);

    async function loadOffices() {
        const data = await executeRequest('', getOffices);
        if (data) {
            dispatch({ type: 'SET_OFFICES', payload: data });
        }
    }

    async function handleSaveOffice(officeData) {
        if (formModal.selectedItem) {
            const updatedOffice = await executeRequest(
                '¡Office updated successfully!', 
                () => replaceOffice(officeData.id, officeData)
            );
            if (updatedOffice) {
                dispatch({ type: 'UPDATE_OFFICE', payload: updatedOffice });
                formModal.closeModal(); 
            }
        } else {
            const createdOffice = await executeRequest(
                '¡Office registered successfully!', 
                () => createOffice(officeData)
            );
            if (createdOffice) {
                dispatch({ type: 'ADD_OFFICE', payload: createdOffice });
                formModal.closeModal(); 
            }
        }
    }

    return (
        <div className="page-content">
            <PageHeader
                title={"Offices"}
                subtitle={`${offices.length} offices found`}
            >   
                <div style={{display: 'flex', gap: '10px'}}>
                    <button className="btn-primary" onClick={() => formModal.openModal()}>
                        + Add New Office
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
                    placeholder="Search by name or location..." 
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
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <OfficeList 
                offices={filteredOffices} 
                openEditModal={(office) => formModal.openModal(office)}
            />

            <OfficeFormModal 
                isOpen={formModal.isOpen}
                onClose={formModal.closeModal}
                onSaveOffice={handleSaveOffice}
                officeToEdit={formModal.selectedItem}
            />
        </div>
    );
}

export default OfficesPage;