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

    static postLogin = async(loginNovo) =>{
        let login = {
            "email": "maria@yahoo.com.br",  
            "password": "PASSWORD"
        }

        let res = await axios.post(`http://192.168.0.4:8080/institution/animals/login`, login)
        return res.data;
    }

    static getTokenFromPhone() {

    }

    static validToken() {
        // Valida token
    }

    static postAnimal = async(animal) => {
        let config = {
            headers: {
                Authorization: "Bearer TOKENVALUE",
            }
        }
        
        axios.post(`http://192.168.0.4:8080/animal/`, animal, config
            ).then((res) => {
                console.log("SUCESS")
                console.log(res)
            }).catch((err) => {
                console.log("ERROR")
                console.log(err)
            })        
        return "true";
    }
}