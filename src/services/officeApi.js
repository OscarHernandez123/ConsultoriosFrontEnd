const API_URL = `${process.env.REACT_APP_API_URL}/offices`;

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

function toOffice(apiOffice) {
    return {
        id: String(apiOffice.id),
        location: apiOffice.location,
        status: apiOffice.status || 'ACTIVE'
    };
}

export async function getOffices(page = 0, size = 50) {
    const url = `${API_URL}?page=${page}&size=${size}`;
    const response = await requestJson(url, { method: 'GET' });
    
    if (response && response.content) {
        return response.content.map(toOffice);
    }
    
    return [];
}

export async function getOfficeById(id) {
    const office = await requestJson(`${API_URL}/${id}`, { method: 'GET' });
    return toOffice(office);
}

export async function createOffice(officeData) {
    const created = await requestJson(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            location: officeData.location
        })
    });
    return toOffice(created);
}

export async function replaceOffice(id, officeData) {
    const updated = await requestJson(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            location: officeData.location,
            status: officeData.status
        })
    });
    return toOffice(updated);
}