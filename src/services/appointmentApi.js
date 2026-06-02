const API_URL = `${process.env.REACT_APP_API_URL}/appointments`;

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

export async function getAppointments(page = 0, size = 10) {
    const url = `${API_URL}?page=${page}&size=${size}`;
    return requestJson(url, { method: 'GET' });
}

export async function getAppointmentById(id) {
    return requestJson(`${API_URL}/${id}`, { method: 'GET' });
}

export async function createAppointment(appointmentData) {
    return requestJson(API_URL, {
        method: 'POST',
        body: JSON.stringify(appointmentData)
    });
}

export async function confirmAppointment(id) {
    return requestJson(`${API_URL}/${id}/confirm`, { method: 'PUT' });
}

export async function cancelAppointment(id, reason) {
    return requestJson(`${API_URL}/${id}/cancel`, {
        method: 'PUT',
        body: JSON.stringify({ reason })
    });
}

export async function completeAppointment(id, administrativeNotes) {
    return requestJson(`${API_URL}/${id}/complete`, {
        method: 'PUT',
        body: JSON.stringify({ administrativeNotes })
    });
}

export async function markNoShowAppointment(id) {
    return requestJson(`${API_URL}/${id}/no-show`, { method: 'PUT' });
}