import { useState } from 'react';

export function useModal(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item = null) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    return { isOpen, openModal, closeModal, selectedItem };
}