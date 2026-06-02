import { useState } from 'react';

export function useFilter(initialData = []) {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All statuses');

    const filteredData = initialData.filter(item => {
        const nameMatches = item.name ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const idMatches = item.id ? String(item.id).includes(searchTerm) : false;
        const matchesSearch = nameMatches || idMatches;
        
        const matchesStatus = filterStatus === 'All statuses' || item.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    return {
        searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        filteredData
    };
}