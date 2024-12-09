import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1", // Replace with your backend URL
    withCredentials: true, // Send cookies with requests
    headers: {
        "Content-Type": "application/json",
    },
});



interface DecodedToken {
    userId: number;
    name: string;
    email: string;
    role: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (error) {
        console.error("Invalid Token");
        return null;
    }
};



export default axiosInstance;
