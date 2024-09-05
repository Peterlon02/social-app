import React, { createContext, useContext, useState } from 'react';

// Crea il contesto
const SelectedSectionContext = createContext();

// Hook personalizzato per utilizzare il contesto
export const useSelectedSection = () => useContext(SelectedSectionContext);

// Provider che avvolge l'app
export const SelectedSectionProvider = ({ children }) => {
    const [selectedSection, setSelectedSection] = useState('Home');

    return (
        <SelectedSectionContext.Provider value={{ selectedSection, setSelectedSection }}>
            {children}
        </SelectedSectionContext.Provider>
    );
};