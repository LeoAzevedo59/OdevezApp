import React, { useState, createContext } from 'react'

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    return (
        <AuthContext.Provider value={{ signed: !!usuario, usuario }}>
            {children}
        </AuthContext.Provider>
    );
}