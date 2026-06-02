import { createContext, useReducer, useState } from 'react';
import { patientReducer } from '../reducers/patientReducer';

export const PatientContext = createContext();

export function PatientProvider({ children }) {

    const [patients, dispatch] = useReducer(patientReducer, []);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    
    const value = {
      patients,
      dispatch,     
      loading,
      setLoading,
      error,
      setError,
      message,
      setMessage
    };

    return (
      <PatientContext.Provider value={value}>
        {children}
      </PatientContext.Provider>
    );
}