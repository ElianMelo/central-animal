import RNFS from 'react-native-fs';

const FILEPATH = RNFS.DocumentDirectoryPath + "/institution.txt";

import PermissionService from './PermissionService';

export default class InstitutionService {

    static getPermissions = async () => {
        await PermissionService.getReadPermission();
        await PermissionService.getWritePermission();
    }

    static getInstitution = async () => {
        await this.getPermissions();

        if(! await RNFS.exists(FILEPATH)) {
            this.setInstitution('null');
        }

        let institution = await RNFS.readFile(FILEPATH, 'utf8').then();

        if(institution != 'null') {
            return institution;
        } else {
            return null;
        }        
    }

    static setInstitution = async (institution) => {
        await this.getPermissions();

        let res = null;
        res = await RNFS.unlink(FILEPATH).then(() => { RNFS.writeFile(FILEPATH, institution, 'utf8').then() });

        return res ? true : false;
    }
}
