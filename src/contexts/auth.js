import React, { useState, createContext } from 'react'
import api from '../contexts/api';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    async function Logar(celular, senha) {
       
        await api.get("client/login", {
            params: {
                phonenumber: celular,
                password: senha,
             
            },
            timeout: 2000
        }).then((response) => {
            setUsuario(response.data);
            console.log(error.response.status);
        }).catch(function (error) {
            console.log(error.response.status);
        });
    }

    async function Cadastrar(nome, sobrenome, email, celular, senha) {
        console.log(nome, sobrenome, email, celular, senha);
        await api.post("client/cadastrar", {
            name: nome + " " + sobrenome,
            email: email,
            phonenumber: celular,
            password: senha
        }).then((response) => {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error.response.data);
        });
    }

    return (
        <AuthContext.Provider value={{ signed: !!usuario, usuario, Logar, Cadastrar }}>
            {children}
        </AuthContext.Provider>
    );
}