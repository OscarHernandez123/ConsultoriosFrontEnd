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

function toAppointment(apiAppointment) {
    let extractedDate = '';
    let extractedTime = '';
    
    if (apiAppointment.startAt) {
        const dateObj = new Date(apiAppointment.startAt);
        extractedDate = dateObj.toLocaleDateString('en-CA');
        extractedTime = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    }

    let mappedStatus = 'Scheduled';
    const rawStatus = apiAppointment.status ? apiAppointment.status.toUpperCase() : '';
    
    if (rawStatus === 'CONFIRMED') mappedStatus = 'Confirmed';
    else if (rawStatus === 'COMPLETED') mappedStatus = 'Completed';
    else if (rawStatus === 'NO_SHOW') mappedStatus = 'No Show';
    else if (rawStatus === 'CANCELED' || rawStatus === 'CANCELLED') mappedStatus = 'Canceled';
    else if (rawStatus === 'SCHEDULED') mappedStatus = 'Scheduled';
    else if (apiAppointment.status) mappedStatus = apiAppointment.status;

    return {
        id: String(apiAppointment.id),
        patientId: apiAppointment.patientId || apiAppointment.patient?.id || '',
        patientName: apiAppointment.patientName || apiAppointment.patient?.fullName || '',
        doctorId: apiAppointment.doctorId || apiAppointment.doctor?.id || '',
        doctorName: apiAppointment.doctorName || apiAppointment.doctor?.fullName || '',
        officeId: apiAppointment.officeId || apiAppointment.office?.id || '',
        officeName: apiAppointment.officeName || apiAppointment.office?.name || '',
        appointmentTypeId: apiAppointment.appointmentTypeId || apiAppointment.appointmentType?.id || '',
        appointmentTypeTitle: apiAppointment.appointmentTypeTitle || apiAppointment.appointmentType?.title || '',
        startAt: apiAppointment.startAt || '',
        date: extractedDate,
        time: extractedTime,
        notes: apiAppointment.notes || apiAppointment.administrativeNotes || '',
        status: mappedStatus
    };
}

export async function getAppointments(page = 0, size = 50) {
    const url = `${API_URL}?page=${page}&size=${size}`;
    const response = await requestJson(url, { method: 'GET' });
    
    if (response && response.content) {
        response.content = response.content.map(toAppointment);
        return response;
    }
    return response ? response.map(toAppointment) : [];
}

export async function getAppointmentById(id) {
    const data = await requestJson(`${API_URL}/${id}`, { method: 'GET' });
    return data ? toAppointment(data) : null;
}

export async function createAppointment(appointmentData) {
    const payload = {
        patientId: appointmentData.patientId,
        doctorId: appointmentData.doctorId,
        officeId: appointmentData.officeId,
        appointmentTypeId: appointmentData.appointmentTypeId,
        startAt: appointmentData.startAt,
        notes: appointmentData.notes
    };

    const created = await requestJson(API_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    return toAppointment(created);
}

export async function confirmAppointment(id) {
    const data = await requestJson(`${API_URL}/${id}/confirm`, { method: 'PUT' });
    return data ? toAppointment(data) : null;
}

export async function cancelAppointment(id, reason) {
    const data = await requestJson(`${API_URL}/${id}/cancel`, {
        method: 'PUT',
        body: JSON.stringify({ reason })
    });
    return data ? toAppointment(data) : null;
}

export async function completeAppointment(id, administrativeNotes) {
    const data = await requestJson(`${API_URL}/${id}/complete`, {
        method: 'PUT',
        body: JSON.stringify({ administrativeNotes })
    });
    return data ? toAppointment(data) : null;
}

export async function markNoShowAppointment(id) {
    const data = await requestJson(`${API_URL}/${id}/no-show`, { method: 'PUT' });
    return data ? toAppointment(data) : null;
}