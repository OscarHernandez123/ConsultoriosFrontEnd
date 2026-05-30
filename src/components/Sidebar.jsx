
function Sidebar(){
    return(
        <aside className = "sidebar">
            <div className = "sidebar-logo">
                <h2>UMO</h2>
                <span>Medical Clinics</span>
            </div>

            <nav className = "sidebar-nav">
                <ul>
                    <li>📊 Dashboard</li>
                    <li>👥 Patients</li>
                    <li>⚕️ Doctors</li>
                    <li>📅 Appointments</li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;