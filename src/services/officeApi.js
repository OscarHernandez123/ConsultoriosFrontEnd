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

export async function getOffices(page = 0, size = 50) {
    const url = `${API_URL}?page=${page}&size=${size}`;
    return requestJson(url, { method: 'GET' });
}

export async function createOffice(officeData) {
    return requestJson(API_URL, {
        method: 'POST',
        body: JSON.stringify(officeData)
    });
}

export async function replaceOffice(id, officeData) {
    return requestJson(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(officeData)
    });
}