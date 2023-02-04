import React, { useState, createContext } from 'react'
import api from '../contexts/api';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [exibirValor, setexibirValor] = useState(false);

    async function Logar(celular, senha) {

        await api.get("usuario/entrar", {
            params: {
                celular: celular,
                senha: senha
            },
            timeout: 2000
        }).then((response) => {
            setUsuario(response.data);
            response.data.apelido === '' ? setexibirValor(false) : setexibirValor(true);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Login");
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
            console.log(error.response.status + " Componente: Cadastro");
            return false;
        });
    }

    async function Deslogar() {
        setUsuario(null);
    }

    function ExibirValor(value) {
        setexibirValor(value)
        return value;
    }

    function AlterarApelido(apelido) {
        usuario.apelido = apelido;
        setUsuario(usuario);
        ExibirValor(true);
    }

    function InserirImagem(urlImagem) {
        usuario.imagem = urlImagem;
        setUsuario(usuario);
        setexibirValor(!exibirValor);
        setexibirValor(exibirValor);
    }

    return (
        <AuthContext.Provider value={{ signed: !!usuario, usuario, exibirValor, Logar, Cadastrar, Deslogar, ExibirValor, AlterarApelido, InserirImagem }}>
            {children}
        </AuthContext.Provider>
    );
}