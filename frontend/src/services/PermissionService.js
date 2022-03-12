
import {
    PermissionsAndroid,
} from 'react-native';

export default class PermissionService {
    static getGeoPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Permissão de localização é necessário para cadastrar animais",
                    message:
                        "Esse aplicativo precisa de sua permissão de localização" +
                        "para buscar por cadastrar animais.",
                    buttonNegative: 'Recusar',
                    buttonPositive: 'Permitir',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    static getWritePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Permissão de escrita é necessário para salvar token",
                    message:
                        "Esse aplicativo precisa de sua permissão de escrita" +
                        "para salvar o token.",
                    buttonNegative: 'Recusar',
                    buttonPositive: 'Permitir',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    static getReadPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Permissão de leitura é necessário para ler token",
                    message:
                        "Esse aplicativo precisa de sua permissão de leitura" +
                        "para ler o token.",
                    buttonNegative: 'Recusar',
                    buttonPositive: 'Permitir',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
        } catch (err) {
            return false;
        }
    }
}
