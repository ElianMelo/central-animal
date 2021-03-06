import axios from "react-native-axios";
import TokenService from "./TokenService";
import InstitutionService from "./InstitutionService";

const BASEURL = 'https://central-animal.herokuapp.com';
export default class RequestService {
    static getInstitutions = async() => {
        let res = await axios.get(`${BASEURL}/institution`);
        return res.data;
    }

    static getInstitution = async(id) => {
        let res = await axios.get(`${BASEURL}/institution/${id}`);
        return res.data;
    }

    static putInstitution = async(id, institution) => {
        let config = await this.getConfig();
        let res = await axios.put(`${BASEURL}/institution/${id}`, institution, config);
        return res.data;
    }

    static putAnimal = async(id, animal) => {
        let config = await this.getConfig();
        let res = await axios.put(`${BASEURL}/animal/${id}`, animal, config);
        return res.data;
    }

    static getAnimalsByInstitution = async(id) => {
        let res = await axios.get(`${BASEURL}/institution/animals/${id}`)
        return res.data;
    }

    static getAnimal = async(id) => {
        let res = await axios.get(`${BASEURL}/animal/${id}`);
        return res.data;
    }

    static getCloserAnimals = async(latitude, longitude) => {
        let res = await axios.get(`${BASEURL}/coordinate/closer-animals/${latitude}&&${longitude}`);
        return res.data;
    }

    static getTenRandomAnimals = async() => {
        let res = await axios.get(`${BASEURL}/animal/ten-random-animals`);
        return res.data;
    }

    static postLogin = async(login) => {
        let res = await axios.post(`${BASEURL}/login`, login);
        if(res.data) {
            let token = res.data;
            await TokenService.setToken(token);
            try {
                let resInst = await axios.get(`${BASEURL}/institution/administrator-email/${login.email}`);
                await InstitutionService.setInstitution(resInst.data.id.toString());
            } catch { }
        }
        return true;
    }

    static validateToken = async() => {
        let config = await this.getConfig();

        let token = await TokenService.getToken();
        let valid = false;

        try {
            await axios.post(`${BASEURL}/administrator/validateToken`, { token }, config);
            valid = true;
        } catch {
            valid = false;
        }

        return valid;
    }

    static postAnimal = async(animal) => {
        let createAnimal = false;
        try {
            await axios.post(`${BASEURL}/animal`, animal);       
            createAnimal = true;
        } catch(e) {
            createAnimal = false;
        }
        return createAnimal;
    }

    static createInstitution = async(institution) => {
        let config = await this.getConfig();
        let createInstitution = false;
        try {
            await axios.post(`${BASEURL}/institution/institution-and-administrator`, institution, config);       
            createInstitution = true;
        } catch(e) {
            createInstitution = false;
        }
        return createInstitution;
    }

    static deleteAnimal = async(id) => {
        let config = await this.getConfig();
        let res = await axios.delete(`${BASEURL}/animal/${id}`, config);
        return res;
    }

    static getConfig = async() => {
        let token = await TokenService.getToken();
        let tokenAuthorization = "Bearer " + token;
        config = {
            headers: {
                Authorization: tokenAuthorization,
            },
        }
        return config;
    }
}