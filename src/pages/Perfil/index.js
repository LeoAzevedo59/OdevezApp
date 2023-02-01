import Ract, { useState, useContext } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import api from '../../contexts/api';

export default function Perfil() {
    const { usuario, InserirImagem } = useContext(AuthContext);
    const [URLimage, setURLImage] = useState('https://containerodevez.blob.core.windows.net/container/');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
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
                setURLImage(URLimage + response.data);
                InserirImagem(response.data);
            }).catch(function (error) {
                console.log(error + " Componente: Perfil - IncluirImagemPerfil()");
                return false;
            });
        }
    };

    return (
        <View>

            <TouchableOpacity onPress={pickImage}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={{ uri: URLimage }}
                />
            </TouchableOpacity>

        </View>
    );
}