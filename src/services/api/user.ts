import { useApi } from "../../Hooks/useApi"
import { UpdatePasswordInterface } from "../../interface/updatePassword.interface"



const api = useApi()


// function find user by email
export async function getUserByEmail(email: string): Promise<object | undefined> {
    try {
        const getUserByEmail = await api.get(`user/byEmail/${email}`)
        console.log("🚀 ~ file: user.ts:13 ~ getUserByEmail ~ getUserByEmail:", getUserByEmail)
        return getUserByEmail.data.datas
    } catch (error) {
        throw new Error('failed while the request : ' + error)
        
    }
}

// function for update user' password
export async function updatePassword(userId: string, body: UpdatePasswordInterface): Promise<object | undefined> {
    try {
        const updatePasswordUser = await api.put(`auth/newpassword/${userId}`, body)
        console.log("🚀 ~ file: user.ts:25 ~ updatePasswordUser ~ updatePasswordUser:", updatePasswordUser)
        return updatePasswordUser.data.datas;
    } catch (error) {
        throw new Error('failed while the request : ' + error)
        
    }
}