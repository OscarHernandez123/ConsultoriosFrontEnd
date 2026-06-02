const API_URL = `${process.env.REACT_APP_API_URL}/reports`;

async function requestJson(url, options = {}) {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    if (response.status === 204) return null;
    return response.json();
}

export async function getOfficeOccupancy(startDate, endDate) {
    const url = `${API_URL}/office-occupancy?startDate=${startDate}&endDate=${endDate}`;
    const response = await requestJson(url, { method: 'GET' });
    return response || [];
}

export async function getDoctorProductivity() {
    const response = await requestJson(`${API_URL}/doctor-productivity`, { method: 'GET' });
    return response || [];
}

export async function getNoShowPatients(startDate, endDate) {
    const url = `${API_URL}/no-show-patients?startDate=${startDate}&endDate=${endDate}`;
    const response = await requestJson(url, { method: 'GET' });
    return response || [];
}

export async function getSpecialtyCancellations() {
    const response = await requestJson(`${API_URL}/specialty-cancellations`, { method: 'GET' });
    return response || [];
}