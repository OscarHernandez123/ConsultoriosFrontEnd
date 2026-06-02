const API_URL = process.env.REACT_APP_API_URL;

async function requestJson(url, options = {}){

    const response = await fetch(url, {
        headers: {
            'Content-Type' : 'application/json',
            ...options.headers
        },
        ...options
    });

    if(!response.ok){
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    if(response.status === 204){
        return null;
    }

    return response.json();
}

function toDoctor(apiDoctor){
    return{
        id: String(apiDoctor.id),
        fullName: apiDoctor.fullName, 
        email: apiDoctor.email,
        specialty: apiDoctor.specialty, 
        profile: apiDoctor.profile,
        status: apiDoctor.status || 'Active'
    }
}

export async function getDoctors(){
    const doctors = await requestJson(API_URL, {
        method: 'GET'
    });
    return doctors.map(toDoctor)
}

export async function getDoctorById(doctorId){
    const doctor = await requestJson(`${API_URL}/${doctorId}`,{
        method: 'GET'
    });
    return toDoctor(doctor);
}

export async function createDoctor(doctorData){
    const created = await requestJson(API_URL, {
        method: 'POST',
        body: JSON.stringify(doctorData)
    });

    return{
        ...doctorData,
        id: String(created.id)
    }
}

export async function replaceDoctor(doctorId, doctorData) {
    await requestJson(`${API_URL}/${doctorId}`, {
        method: 'PUT',
        body: JSON.stringify(doctorData)
    });
    return { ...doctorData, id: String(doctorId) };
}

export async function patchDoctor(doctorId, partialData){
    await requestJson(`${API_URL}/${doctorId}`, {
        method: 'PATCH',
        body: JSON.stringify(partialData)
    });
    return{ id: String(doctorId), ...partialData};
}

export async function getDoctorAvailability(doctorId, dateString, appointmentTypeId) {
    const queryParams = new URLSearchParams({
        day: dateString,
        appointmentTypeId: appointmentTypeId
    });
    
    return requestJson(`${API_URL}/availability/doctors/${doctorId}?${queryParams.toString()}`, {
        method: 'GET'
    });
}
