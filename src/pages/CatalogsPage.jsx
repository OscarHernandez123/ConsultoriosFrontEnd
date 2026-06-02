import { useContext } from "react";
import { CatalogContext } from "../context/CatalogContext";
import PageHeader from "../components/PageHeader";
import { useModal } from "../hooks/useModal";
import SpecialtyFormModal from "../components/catalogs/SpecialtyFormModal";
import AppointmentTypeFormModal from "../components/catalogs/AppointmentTypeFormModal";

function CatalogsPage() {
    const { catalogs } = useContext(CatalogContext);
    const { specialties, appointmentTypes } = catalogs;

    const specialtyModal = useModal();
    const typeModal = useModal();

    const getInitials = (title) => {
        if (!title) return "NA";
        const words = title.trim().split(" ");
        if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    };

    return (
        <div className="page-content">
            <PageHeader
                title="Catalog"
                subtitle="Management of medical specialties and appointment types"
            />

            <div className="catalog-grid">
                
                <div className="catalog-column">
                    <div className="catalog-section-header">
                        <div>
                            <h3>Specialties</h3>
                            <p>{specialties.length} registered</p>
                        </div>
                        <button className="btn-primary" onClick={() => specialtyModal.openModal()}>
                            + Add
                        </button>
                    </div>

                    <div className="catalog-list">
                        {specialties.map(spec => (
                            <div key={spec.id} className="catalog-card">
                                <div className="catalog-badge badge-blue">
                                    {getInitials(spec.title)}
                                </div>
                                <div className="catalog-info">
                                    <h4>{spec.title}</h4>
                                    <p>Code: {getInitials(spec.title)}</p>
                                </div>
                            </div>
                        ))}
                        {specialties.length === 0 && (
                            <p className="empty-state">No specialties registered.</p>
                        )}
                    </div>
                </div>

                <div className="catalog-column">
                    <div className="catalog-section-header">
                        <div>
                            <h3>Appointment Types</h3>
                            <p>{appointmentTypes.length} configured</p>
                        </div>
                        <button className="btn-primary" onClick={() => typeModal.openModal()}>
                            + Add
                        </button>
                    </div>

                    <div className="catalog-list">
                        {appointmentTypes.map(type => (
                            <div key={type.id} className="catalog-card">
                                <div className="catalog-badge badge-green">
                                    ⏱️
                                </div>
                                <div className="catalog-info">
                                    <h4>{type.title}</h4>
                                    <p>Duration: {type.durationMinutes} min</p>
                                </div>
                                <div className="time-pill">
                                    {type.durationMinutes} min
                                </div>
                            </div>
                        ))}
                        {appointmentTypes.length === 0 && (
                            <p className="empty-state">No appointment types configured.</p>
                        )}
                    </div>
                </div>

            </div>

            <SpecialtyFormModal 
                isOpen={specialtyModal.isOpen} 
                onClose={specialtyModal.closeModal} 
            />
            
            <AppointmentTypeFormModal 
                isOpen={typeModal.isOpen} 
                onClose={typeModal.closeModal} 
            />

        </div>
    );
}

export default CatalogsPage;