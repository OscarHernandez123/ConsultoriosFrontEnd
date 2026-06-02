
import { useLocation } from 'react-router-dom';

function Topbar() {
    
    const location = useLocation();

    const getTitle = (path) => {
        switch (path) {
            case '/dashboard': return 'Dashboard';
            case '/patients': return 'Patients';
            case '/doctors': return 'Doctors';
            case '/catalogs': return 'Catalogs';
            case '/offices': return 'Offices';
            case '/appointments': return 'Appointments';
            default: return 'System';
        }
    };

    return(
        <header className="topbar">
            <div>
                <h2>{getTitle(location.pathname)}</h2>
            </div>

            <div className="user-profile">
                <span>Admin User</span>
                <div className="avatar"></div>
            </div>
        </header>
    );
}

export default Topbar;