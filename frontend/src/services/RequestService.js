import axios from "react-native-axios";
import TokenService from "./TokenService";

const BASEURL = 'http://192.168.0.4:8080';
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

    static getAnimalsByInstitution = async(id) => {
        let res = await axios.get(`${BASEURL}/institution/animals/${id}`)
        return res.data;
    }

    static postLogin = async(login) => {
        let res = await axios.post(`${BASEURL}/login`, login);
        if(res.data) {
            let token = res.data;
            await TokenService.setToken(token);
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
        let config = await this.getConfig();
        let createAnimal = false;
        try {
            await axios.post(`${BASEURL}/animal`, animal, config);       
            createAnimal = true;
        } catch(e) {
            createAnimal = false;
        }
        return createAnimal;
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