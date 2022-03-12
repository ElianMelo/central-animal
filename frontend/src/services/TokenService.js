import RNFS from 'react-native-fs';

const FILEPATH = RNFS.DocumentDirectoryPath + "/token.txt";

import PermissionService from './PermissionService';

export default class TokenService {

    static getPermissions = async () => {
        await PermissionService.getReadPermission();
        await PermissionService.getWritePermission();
    }

    static getToken = async () => {
        await this.getPermissions();

        if(! await RNFS.exists(FILEPATH)) {
            this.setToken('null');
        }

        let token = await RNFS.readFile(FILEPATH, 'utf8').then();

        if(token != 'null') {
            return token;
        } else {
            return null;
        }        
    }

    static setToken = async (token) => {
        await this.getPermissions();

        let res = null;
        res = await RNFS.writeFile(FILEPATH, token, 'utf8').then();

        return res ? true : false;
    }
}
