const API_URL = `${process.env.REACT_APP_API_URL}/specialties`;

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
  const response = await requestJson(API_URL, { method: 'GET' });
  
  if (Array.isArray(response)) {
      return response.map(toSpecialty);
  }
  if (response && response.content) {
      return response.content.map(toSpecialty);
  }

  return [];
}

export async function createSpecialty(specialtyData) {
  const created = await requestJson(API_URL, {
    method: 'POST',
    body: JSON.stringify({
        title: specialtyData.title
    })
  });

  return toSpecialty(created);
}