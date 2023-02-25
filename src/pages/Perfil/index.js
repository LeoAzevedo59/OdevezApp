import Ract, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import api from '../../contexts/api';
import {
    Container,
    BtnImagem,
    Texto,
    BtnDeletarConta,
    Div
} from './styles';
import { Entypo } from '@expo/vector-icons';

export default function Perfil() {
    const { usuario, InserirImagem } = useContext(AuthContext);
    const [URLimage, setURLImage] = useState(null);
    const [link, setLink] = useState('https://containerodevez.blob.core.windows.net/container/')
    const { Deslogar } = useContext(AuthContext);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        });

        if (!result.canceled) {
            const file = result.assets[0].uri;
            const base64 = await FileSystem.readAsStringAsync(file, { encoding: 'base64' });
            let imageBase64 = 'data:image/png;base64,' + base64;
            IncluirImagemPerfil(imageBase64)
        }

        async function IncluirImagemPerfil(imageBase64) {

            await api.post("usuario/incluir-imagem-perfil", {
                ImageBase64: imageBase64,
                Usuario: usuario.codigo
            }, {
                headers: {
                    Authorization: usuario.type + " " + usuario.token
                }
            }).then((response) => {
                setURLImage(link + response.data);
                InserirImagem(response.data);
            }).catch(function (error) {
                console.log(error + " Componente: Perfil - IncluirImagemPerfil()");
                return false;
            });
        }
    };

    async function Excluir() {

        await api.delete("usuario/excluir", {
            headers: {
                Authorization: usuario.type + " " + usuario.token
            },
            params: {
                user: usuario.codigo
            }
        }).then((response) => {
            if (response.data) {
                alert('Conta excluida com sucesso');
                Deslogar();
            }
        }).catch(function (error) {
            alert(error);
            return false;
        });
    }

    useEffect(() => {
        setURLImage(link + usuario.imagem)
    }, []);

    return (
        <Container>
            <Div>

                <BtnImagem onPress={pickImage}>
                    {usuario.imagem !== null
                        ?
                        <Image
                            style={{ width: 150, height: 150, borderRadius: 150 }}
                            source={{ uri: URLimage }}
                        />
                        :
                        <Entypo name="image" size={50} color="yellow" />
                    }
                </BtnImagem>
                <Texto>{usuario.apelido}</Texto>
            </Div>
            <BtnDeletarConta onPress={() => Excluir()}>
                <Text style={{ color: 'white' }}>Excluir Conta</Text>
            </BtnDeletarConta>
        </Container>
    );
}