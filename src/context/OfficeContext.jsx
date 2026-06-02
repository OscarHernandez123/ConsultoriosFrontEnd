import { createContext, useReducer, useState } from "react";
import { officeReducer } from "../reducers/officeReducer";

export const OfficeContext = createContext();

export function OfficeProvider({ children }) {
    
    const [offices, dispatch] = useReducer(officeReducer, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const value = {
        offices, 
        dispatch,
        loading, 
        setLoading,
        error, 
        setError,
        message, 
        setMessage
    };

    return (
        <OfficeContext.Provider value={value}>
            {children}
        </OfficeContext.Provider>
    );
}