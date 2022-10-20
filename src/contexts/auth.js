import React, { useState, createContext } from 'react'
import api from '../contexts/api';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    async function Logar(celular, senha) {

        await api.get("usuario/entrar", {
            params: {
                celular: celular,
                senha: senha
            },
            timeout: 2000
        }).then((response) => {
            setUsuario(response.data);
        }).catch(function (error) {
            console.log(error.response.status);
            return false;
        });
    }

    async function Cadastrar(nome, sobrenome, cpf, email, celular, senha, confirmarSenha) {
        await api.post("usuario/cadastrar", {
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            email: email,
            celular: celular,
            senha: senha,
            confirmarSenha: confirmarSenha
        }).then((response) => {
            setUsuario(response.data);
        }).catch(function (error) {
            console.log(error.response.status);
            return false;
        });
    }

    async function Deslogar() {
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ signed: !!usuario, usuario, Logar, Cadastrar, Deslogar }}>
            {children}
        </AuthContext.Provider>
    );
}