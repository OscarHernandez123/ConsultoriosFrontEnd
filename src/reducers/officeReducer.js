
export function officeReducer(state, action) {
    switch (action.type) {
        case 'SET_OFFICES':
            return action.payload.content ? action.payload.content : action.payload;
            
        case 'ADD_OFFICE':
            return [...state, action.payload];
            
        case 'UPDATE_OFFICE':
            return state.map(office =>
                office.id === action.payload.id ? action.payload : office
            );
            
        default:
            return state;
    }
}