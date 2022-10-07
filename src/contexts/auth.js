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
            console.log('login sucesso')
            setUsuario(response.data);
        }).catch(function (error) {
            console.log(error.response.status);
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
            console.log('cadastro sucesso');
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