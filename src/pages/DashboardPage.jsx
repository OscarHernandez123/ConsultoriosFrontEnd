import StatCard from "../components/StatCard";

function DashboardPage(){
    return(
        <div className = "dashboard-grid">

            <StatCard title = "Active Patients" value = "1,245"/>
            <StatCard title = "Doctors Online" value = "35"/>
            <StatCard title = "Today's Appointments" value = "89"/>
            <StatCard title = "Available Offices" value = "10"/>

        </div>
    );
}

export default DashboardPage;