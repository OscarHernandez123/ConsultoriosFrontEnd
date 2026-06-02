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

function toSpecialty(apiSpecialty) {
  return {
    id: String(apiSpecialty.id), 
    title: apiSpecialty.title
  };
}

export async function getSpecialties() {
  const users = await requestJson(API_URL, {
    method: 'GET'
  });
  return users.map(toSpecialty);
}

export async function createSpecialty(specialtyData) {
  const created = await requestJson(API_URL, {
    method: 'POST',
    body: JSON.stringify(specialtyData)
  });

  return {
    ...specialtyData,
    id: String(created.id)
  };
}