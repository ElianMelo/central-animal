import axios from "react-native-axios";

export default class RequestService {
    static getInstitutions = async() => {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        return res.data[0].name;
    }

    static getInstitution = async() => {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        return res.data[0].name;
    }

    static getAnimals = async() => {
        let res = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        return res.data[0].name;
    }
}