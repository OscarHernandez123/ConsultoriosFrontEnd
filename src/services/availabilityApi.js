const API_URL = `${process.env.REACT_APP_API_URL}/availability`;

async function requestJson(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

/**

 * @param {string} doctorId 
 * @param {string} date 
 * @param {string} appointmentTypeId 
 */
export async function getDoctorAvailability(doctorId, date, appointmentTypeId) {

    const url = `${API_URL}/doctors/${doctorId}?day=${date}&appointmentTypeId=${appointmentTypeId}`;
    
    const response = await requestJson(url, { method: 'GET' });
    
    return response || [];
}