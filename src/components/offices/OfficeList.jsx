
function OfficeList({ offices, openEditModal}){
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Office</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {offices.map(office => (
                        <tr key={office.id}>
                            <td>
                                <span className="name">{office.name}</span>
                            </td>
                            <td>{office.location}</td>
                            <td>
                                <span className={`status-badge ${
                                    office.status === 'Active' ? 'status-active' : 
                                    office.status === 'Maintenance' ? 'status-maintenance' : 
                                    'status-inactive'
                                }`}>
                                    {office.status}
                                </span>
                            </td>
                            <td>
                                <button onClick={() => openEditModal(office)}>📝</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OfficeList;