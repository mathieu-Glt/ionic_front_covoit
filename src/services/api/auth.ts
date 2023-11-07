import { useApi } from "../../Hooks/useApi";
import axios from "axios";
import { LoginInterface } from "../../interface/login.interface";


const api = useApi();



// function for login the user
export async function loginUser(body: LoginInterface): Promise<object | undefined> {
    try {
        const login = await api.post('auth/login', body)
        console.log("🚀 ~ file: auth.ts:14 ~ loginUser ~ login:", login)
        return login;
    } catch (error) {
        throw new Error("echec de la connection " + error);
    }
}



// function who refresh the token of user
export async function refreshTokens(): Promise<object | undefined>{
    
    const token = localStorage.getItem('refreshToken');
    const headers = {
        'Authorization': 'Bearer ' + token,
    }
   
    try {
        const refreshResponse = await axios.get(
            import.meta.env.VITE_API_BASE_URL+ 'auth/refresh-token',
            { headers }
        );
        console.log(":rocket: ~ file: auth.tsx:55 ~ refreshToken ~ refreshToken:", refreshResponse)
        return refreshResponse;
    } catch (error) {
        throw new Error("Echec du refreshToken " + error);  
    }
}

// function that destroy token of user
export async function destroyTokenUser(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
}

