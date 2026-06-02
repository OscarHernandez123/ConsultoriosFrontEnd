
function Topbar(){
    return(
        <header className = "topbar">
            <div>
                <h2>Patients</h2>
            </div>

            <div className = "user-profile">
                <span>Admin User</span>
                <div className = "avatar"></div>
            </div>
        </header>
    );
}

export default Topbar;