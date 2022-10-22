export const MascaraCPF = value => {
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export const MascaraCelular = value => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1)$2')
        .replace(/(\d{5})/, '$1-')
        .replace(/(-\d{4})\d+?$/, '$1')
}

export const InputString50 = value => {
    return value
        .replace(/[^a-zA-Z]/g, '').substring(0, 50)
}

export const InputEmail = value => {
    return value
        .replace(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.[a-z]?$/i).substring(0, 50)
}