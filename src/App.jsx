import './index.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import DoctorsPage from './pages/DoctorsPage';
import CatalogsPage from './pages/CatalogsPage';
import OfficesPage from './pages/OfficesPage';
import AppointmentsPage from './pages/AppointmentsPage';
import { PatientProvider } from './context/PatientContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DoctorProvider } from './context/DoctorContext';
import { CatalogProvider } from './context/CatalogContext';
import { OfficeProvider } from './context/OfficeContext';
import { AppointmentProvider } from './context/AppointmentContext';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', height: '100vh' }}>        
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>          
          <Topbar />
          <AppointmentProvider>
            <OfficeProvider>
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
                        <Route path="/offices" element={<OfficesPage/>}/>
                        <Route path="/appointments" element={<AppointmentsPage/>}/>
                        <Route path="*" element={<div style={{padding: '20px'}}><h2>404 - Página no encontrada</h2></div>} />
                      </Routes>
                    </main>

                  </PatientProvider>
                </DoctorProvider>
              </CatalogProvider>
            </OfficeProvider>
          </AppointmentProvider>
        </div>

      </div>
    </Router>
  );
}

export default App;

