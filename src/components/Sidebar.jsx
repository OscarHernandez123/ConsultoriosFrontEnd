import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <h2>UMO</h2>
                <span>Medical Clinics</span>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/patients">Patients</NavLink>
                    </li>
                    <li>
                        <NavLink to="/doctors">Doctors</NavLink>
                    </li>
                    <li>
                        <NavLink to="/catalogs">Catalogs</NavLink>
                    </li>
                    <li>
                        <NavLink to="/offices">Offices</NavLink>
                    </li>
                    <li>
                        <NavLink to="/availability">Availability</NavLink>
                    </li>
                    <li>
                        <NavLink to="/appointments">Appointments</NavLink>
                    </li>
                    <li>
                        <NavLink to="/reports">Reports</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;