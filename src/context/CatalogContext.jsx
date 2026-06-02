import { createContext, useReducer, useState, useEffect } from "react";
import { catalogReducer } from "../reducers/catalogReducer";
import { getSpecialties } from "../services/specialtyApi";
import { getAppointmentTypes } from "../services/appointmentTypeApi";
import { useApi } from "../hooks/useApi";

export const CatalogContext = createContext();

export function CatalogProvider({ children }) {

    const [catalogs, dispatch] = useReducer(catalogReducer, {
        specialties: [],
        appointmentTypes: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const { executeRequest } = useApi(setLoading, setError, setMessage);

    useEffect(() => {
        loadCatalogs();
    }, []);

    async function loadCatalogs() {
        const [specialtiesData, typesData] = await executeRequest('', async () => {
            return await Promise.all([
                getSpecialties(),
                getAppointmentTypes()
            ]);
        });
        
        if (specialtiesData) {
            dispatch({ type: 'SET_SPECIALTIES', payload: specialtiesData });
        }
        
        if (typesData) {
            dispatch({ type: 'SET_APPOINTMENT_TYPES', payload: typesData });
        }
    }

    const value = {
        catalogs,
        dispatch,
        loading,
        setLoading,
        error,
        setError,
        message,
        setMessage
    };

    return (
        <CatalogContext.Provider value={value}>
            {children}
        </CatalogContext.Provider>
    );
}