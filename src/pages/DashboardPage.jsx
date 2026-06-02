import { useState, useEffect, useContext } from 'react';
import StatCard from "../components/StatCard";

import { PatientContext } from '../context/PatientContext';
import { DoctorContext } from '../context/DoctorContext';
import { AppointmentContext } from '../context/AppointmentContext';
import { OfficeContext } from '../context/OfficeContext';

import { getDoctorProductivity, getSpecialtyCancellations } from '../services/reportApi';

function DashboardPage(){
    
    const { patients } = useContext(PatientContext);
    const { doctors } = useContext(DoctorContext);
    const { appointments } = useContext(AppointmentContext);
    const { offices } = useContext(OfficeContext);

    const [productivity, setProductivity] = useState([]);
    const [cancellations, setCancellations] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const prodData = await getDoctorProductivity();
                setProductivity(prodData || []);

                const cancData = await getSpecialtyCancellations();
                setCancellations(cancData || []);
            } catch (error) {
                console.error("Error cargando los reportes:", error);
            }
        };
        fetchReports();
    }, []);

    const activePatientsCount = patients ? patients.filter(p => p.status === 'Active').length : 0;
    const activeDoctorsCount = doctors ? doctors.filter(d => d.status === 'Active').length : 0;
    const activeOfficesCount = offices ? offices.filter(o => o.status === 'Active').length : 0;
    
    const today = new Date().toLocaleDateString('en-CA'); 
    const todayAppointmentsCount = appointments ? appointments.filter(a => a.date === today).length : 0;

    return(
        <div className="dashboard-container">
            
            <div className="dashboard-grid">
                <StatCard title="Active Patients" value={activePatientsCount} />
                <StatCard title="Active Doctors" value={activeDoctorsCount} />
                <StatCard title="Today's Appointments" value={todayAppointmentsCount} />
                <StatCard title="Active Offices" value={activeOfficesCount} />
            </div>

            <div className="reports-section">
                
                <div className="report-card">
                    <h3 className="report-card-title">Doctor Productivity (Top)</h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Appointments Handled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productivity.length > 0 ? productivity.slice(0, 5).map((doc, index) => (
                                <tr key={index}>
                                    <td>{doc.doctorName || doc.fullName || `Doctor #${index + 1}`}</td>
                                    <td>{doc.appointmentCount || doc.total || 0}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="2" className="text-muted">No productivity data available yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="report-card">
                    <h3 className="report-card-title">Cancellations by Specialty</h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Specialty</th>
                                <th>Canceled Appointments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cancellations.length > 0 ? cancellations.slice(0, 5).map((spec, index) => (
                                <tr key={index}>
                                    <td>{spec.specialtyName || spec.title || `Specialty #${index + 1}`}</td>
                                    <td className="text-danger">{spec.cancellationCount || spec.count || 0}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="2" className="text-muted">No cancellation data available yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;