
export function appointmentReducer(state, action) {
    switch (action.type) {
        case 'SET_APPOINTMENTS':
            const appointmentList = action.payload.content ? action.payload.content : action.payload;
            return appointmentList;
            
        case 'ADD_APPOINTMENT':
            return [...state, action.payload];
            
        case 'UPDATE_APPOINTMENT':
            return state.map(appointment =>
                appointment.id === action.payload.id ? action.payload : appointment
            );
            
        default:
            return state;
    }
}