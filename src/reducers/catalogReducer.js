
export function catalogReducer(state, action) {
    switch (action.type) {
        case 'SET_SPECIALTIES':
            return { ...state, specialties: action.payload };
            
        case 'ADD_SPECIALTY':
            return { ...state, specialties: [...state.specialties, action.payload] };

        case 'SET_APPOINTMENT_TYPES':
            return { ...state, appointmentTypes: action.payload };
            
        case 'ADD_APPOINTMENT_TYPE':
            return { ...state, appointmentTypes: [...state.appointmentTypes, action.payload] };

        default:
            return state;
    }
}