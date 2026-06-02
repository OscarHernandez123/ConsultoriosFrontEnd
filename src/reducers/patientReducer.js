
export function patientReducer(state, action) {
  switch (action.type) {
      case 'SET_PATIENTS':
        return action.payload.content ? action.payload.content : action.payload;
        
      case 'ADD_PATIENT':
        return [action.payload, ...state];
        
      case 'UPDATE_PATIENT':
        return state.map(patient => 
          patient.id === action.payload.id ? action.payload : patient
        );
        
      default:
        return state;
  }
}