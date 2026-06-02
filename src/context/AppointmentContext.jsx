import { createContext, useReducer, useState } from "react";
import { appointmentReducer } from "../reducers/appointmentReducer";

export const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
    
    const [appointments, dispatch] = useReducer(appointmentReducer, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const value = {
        appointments,
        dispatch,
        loading,
        setLoading,
        error,
        setError,
        message,
        setMessage
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
}