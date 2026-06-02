import { createContext, useReducer, useState } from "react";
import { doctorReducer } from "../reducers/doctorReducer";

export const DoctorContext = createContext();

export function DoctorProvider({children}){

    const [doctors, dispatch] = useReducer(doctorReducer, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const value = {
        doctors,
        dispatch,
        loading,
        setLoading,
        error,
        setError,
        message,
        setMessage
    };

    return(
        <DoctorContext.Provider value = {value}>
            {children}
        </DoctorContext.Provider>
    );
}