
export function doctorReducer(state, action){
    switch(action.type){
        case 'SET_DOCTORS':
            return action.payload.content ? action.payload.content : action.payload

        case 'ADD_DOCTOR':
            return [action.payload, ...state];

        case 'UPDATE_DOCTOR':
            return state.map(doctor => 
                doctor.id === action.payload.id ? action.payload : doctor
            );

        default:
            return state;        
    }
}