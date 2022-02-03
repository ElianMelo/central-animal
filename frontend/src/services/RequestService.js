import axios from "react-native-axios";

export default class RequestService {
    static getInstitutions = async() => {
        let res = await axios.get("http://192.168.0.4:8080/institution");
        return res.data;
    }

    static getInstitution = async(id) => {
        let res = await axios.get(`http://192.168.0.4:8080/institution/${id}`);
        return res.data;
    }

    static getAnimalsByInstitution = async(id) => {
        let res = await axios.get(`http://192.168.0.4:8080/institution/animals/${id}`)
        return res.data;
    }
}