const API_URL = `${process.env.REACT_APP_API_URL}/patients`;

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

function toPatient(apiPatient) {
  return {
    id: String(apiPatient.id),
    identification: apiPatient.identification,
    name: apiPatient.fullName, 
    email: apiPatient.email,
    phone: apiPatient.phone,
    status: apiPatient.status
  };
}

export async function getPatients(page = 0, size = 50) {
  const url = `${API_URL}?page=${page}&size=${size}`;
  const response = await requestJson(url, { method: 'GET' });
  
  if (response && response.content) {
    return response.content.map(toPatient);
  }
  
  return [];
}

export async function getPatientById(patientId) {
  const patient = await requestJson(`${API_URL}/${patientId}`, { method: 'GET' });
  return toPatient(patient);
}

export async function createPatient(patientData) {
  const payload = {
    fullName: patientData.name || patientData.fullName,
    phone: patientData.phone,
    email: patientData.email,
    identification: patientData.identification
  };

  const created = await requestJson(API_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return toPatient(created);
}

export async function replacePatient(patientId, patientData) {
  const payload = {
    fullName: patientData.name || patientData.fullName,
    phone: patientData.phone,
    email: patientData.email,
    identification: patientData.identification,
    status: patientData.status || 'ACTIVE'
  };

  const updated = await requestJson(`${API_URL}/${patientId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
  
  return toPatient(updated);
}