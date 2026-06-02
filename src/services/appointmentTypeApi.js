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

function toAppointmentType(apiAppointmentType) {
  return {
    id: String(apiAppointmentType.id), 
    title: apiAppointmentType.title,
    durationMinutes: apiAppointmentType.durationMinutes
  };
}

export async function getAppointmentTypes() {
  const users = await requestJson(API_URL, {
    method: 'GET'
  });
  return users.map(toAppointmentType);
}

export async function createAppointmentType(appointmentTypeData) {
  const created = await requestJson(API_URL, {
    method: 'POST',
    body: JSON.stringify(appointmentTypeData)
  });

  return {
    ...appointmentTypeData,
    id: String(created.id)
  };
}