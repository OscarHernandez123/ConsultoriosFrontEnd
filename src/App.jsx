import './index.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import DoctorsPage from './pages/DoctorsPage';
import CatalogsPage from './pages/CatalogsPage';
import { PatientProvider } from './context/PatientContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DoctorProvider } from './context/DoctorContext';
import { CatalogProvider } from './context/CatalogContext';

const DashboardPlaceholder = () => <div style={{padding: '20px'}}><h2>Dashboard</h2><p>Próximamente...</p></div>;
const AvailabilityPlaceholder = () => <div style={{padding: '20px'}}><h2>Doctores</h2><p>Próximamente...</p></div>;
const OfficesPlaceholder = () => <div style={{padding: '20px'}}><h2>Doctores</h2><p>Próximamente...</p></div>;
const AppointmentsPlaceholder = () => <div style={{padding: '20px'}}><h2>Doctores</h2><p>Próximamente...</p></div>;
const ReportsPlaceholder = () => <div style={{padding: '20px'}}><h2>Doctores</h2><p>Próximamente...</p></div>;

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', height: '100vh' }}>        
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>          
          <Topbar />
          <CatalogProvider>
            <DoctorProvider>
              <PatientProvider>
                
                <main className="main-content" style={{ flex: 1, overflowY: 'auto' }}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />              
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/catalogs" element={<CatalogsPage />}/>
                    <Route path="/offices" element={<OfficesPlaceholder/>}/>
                    <Route path="/availability" element={<AvailabilityPlaceholder/>}/>
                    <Route path="/appointments" element={<AppointmentsPlaceholder/>}/>
                    <Route path="/reports" element={<ReportsPlaceholder/>}/>
                    <Route path="*" element={<div style={{padding: '20px'}}><h2>404 - Página no encontrada</h2></div>} />
                  </Routes>
                </main>

              </PatientProvider>
            </DoctorProvider>
          </CatalogProvider>

        </div>

      </div>
    </Router>
  );
}

export default App;

