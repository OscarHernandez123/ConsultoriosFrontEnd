const API_URL = process.env.REACT_APP_API_URL;

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
    identification: `100${apiPatient.id}234567`, 
    name: apiPatient.name,
    email: apiPatient.email,
    phone: apiPatient.phone || 'No phone',
    status: apiPatient.id % 2 === 0 ? 'Active' : 'Inactive' 
  };
}

export async function getPatients() {
  const users = await requestJson(API_URL, {
    method: 'GET'
  });
  return users.map(toPatient);
}

export async function getPatientById(patientId) {
  const user = await requestJson(`${API_URL}/${patientId}`, {
    method: 'GET'
  });
  return toPatient(user);
}

export async function createPatient(patientData) {
  const created = await requestJson(API_URL, {
    method: 'POST',
    body: JSON.stringify(patientData)
  });

  return {
    ...patientData,
    id: String(created.id)
  };
}

export async function replacePatient(patientId, patientData) {
  await requestJson(`${API_URL}/${patientId}`, {
    method: 'PUT',
    body: JSON.stringify(patientData)
  });
  return { ...patientData, id: String(patientId) };
}

export async function patchPatient(patientId, partialData) {
  await requestJson(`${API_URL}/${patientId}`, {
    method: 'PATCH',
    body: JSON.stringify(partialData)
  });
  return { id: String(patientId), ...partialData };
}

export async function deletePatient(patientId) {
  await requestJson(`${API_URL}/${patientId}`, {
    method: 'DELETE'
  });
  return { id: String(patientId), deleted: true };
}