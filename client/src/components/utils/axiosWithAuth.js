import axios from "axios";

export default function axiosWithAuth() {

    return axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}