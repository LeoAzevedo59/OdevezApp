import React, { useState, useContext, useEffect } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import api from '../../contexts/api';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-community/picker';

import {
    FontAwesome
} from '@expo/vector-icons';

import {
    Container,
    Botao,
    Texto,
    Bank,
    Background,
    H1,
    ContainerCarteira
} from './styles';

const ImportExtrato = () => {
    const { usuario, ExibirValor, exibirValor } = useContext(AuthContext);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCarteira, setSelectedCarteira] = useState(0);
    const [carteiras, setCarteiras] = useState(null);


    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync();
            if (result.type === 'success') {
                if (result.mimeType !== "application/octet-stream") {
                    alert("Arquivo não suportado! \n\nInclusão é somente arquivo .OFX")
                    return;
                }
                await convertFile(result);
            }
        } catch (err) {
            console.log('Erro ao selecionar arquivo', err);
        }
    };

    const convertFile = async (result) => {
        const fileContent = await FileSystem.readAsStringAsync(result.uri);
        await Incluir(fileContent);
    };

    const getContent = () => {
        if (isLoading)
            return <ActivityIndicator size="large" />
    }

    async function Incluir(contentFile) {
        try {
            setIsLoading(true);
            await api.post("importararquivo/incluir-ofx", {
                carteira: carteiras[selectedCarteira].codigo,
                content: contentFile
            }, {
                headers: {
                    Authorization: usuario.type + " " + usuario.token
                }
            }).then((response) => {
                ExibirValor(!exibirValor);
                ExibirValor(exibirValor);
                alert(response.data);
                setIsLoading(false);
                navigation.goBack();
            }).catch(function (error) {
                console.log(error + " Componente: Cadastro de carrteira - IncluirCarteira()");
                setIsLoading(false);
                return false;
            });
        } catch (error) {
            console.log('Erro ao enviar arquivo', error);
        }
    }

    async function ObterDescricaoCarteiras() {
        await api.get("carteira/obter-descricao-carteira-por-usuario", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                usuario: usuario.codigo
            }
        }).then((response) => {
            setCarteiras(response.data);
            setIsLoading(false);
        }).catch(function (error) {
            console.log(error.response.status + " Componente: Cadastro de patrimonio");
        });
    }

    useEffect(() => {
        setIsLoading(true);
        ObterDescricaoCarteiras();
    }, [])

    return (
        <Container>
            <Text style={{ fontWeight: 'bold' }}>Carteira(s)</Text>
            <ContainerCarteira>
                <Bank>
                    <FontAwesome name="bank" size={20} color="##333" />
                </Bank>
                <Background>
                    <Picker
                        selectedValue={selectedCarteira}
                        onValueChange={(itemValue, itemIndex) => setSelectedCarteira(itemValue)}
                    >
                        {
                            carteiras != null
                                ?
                                carteiras.map((value, key) => {
                                    return <Picker.Item key={key} value={key} label={value.descricao} />
                                })
                                :
                                <H1 />
                        }
                    </Picker>
                </Background>
            </ContainerCarteira>
            {
                isLoading === false
                    ?
                    <Botao title="Selecionar arquivo" onPress={pickDocument}>
                        <Texto>Incluir OFX</Texto>
                    </Botao>
                    :
                    getContent()
            }

            <Text style={{ marginTop: 16 }}>No momento a importação de extrato é somente feito via arquivo OFX.</Text>
        </Container>
    );
};

export default ImportExtrato;