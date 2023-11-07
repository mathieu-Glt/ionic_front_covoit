import { useApi } from "../../Hooks/useApi";

const api = useApi()


// call to api back-end for take all associations
export async function getAllAssociations(): Promise<object | undefined> {
    try {
        const response = await api.get('associations');
        console.log("🚀 ~ file: association.ts:13 ~ getAllAssociations ~ response:", response)
        console.log("COOUCOUS LES DATAS", response.data.datas);
        
        return response.data.datas;
        
    } catch (error) {
        throw  new Error("Error during the request for take all events" + error)
    }
}


// call to api back-end take a association
export async function getAssociationById(id: string | undefined): Promise<object | undefined> {
    console.log("🚀 ~ file: association.ts:26 ~ getAssociationById ~ id:", id)
    try {
        const response = await api.get(`association/${id}`);
        console.log("🚀 ~ file: association.ts:30 ~ getAssociationById ~ response:", response)

        return response.data.datas;
    } catch (error) {
        throw  new Error("Error during the request for take an association" + error)

    }
}


// function that search associations realted to user
export async function findAssociationRelatedUser(id: string): Promise<object | undefined>
{
    try {
        const response = await api.get(`asso/user/${id}`)
        console.log("🚀 ~ file: association.ts:58 ~ response:", response)
        return response.data.datas;
    } catch (error) {
        console.log("🚀 ~ file: association.ts:59 ~ error:", error)
        
    }
}



// call to api back-end take a association related with user(role=user) connected app mobile 
// export async function getAssociationRelatedUserConnected(id: string | undefined) 
// {
//     console.log("🚀 ~ file: association.ts:40 ~ id:", id)
//     try {
//         const response = await api.get(`asso/role/user/${id}`);

//         console.log("🚀 ~ file: association.ts:45 ~ response:", response)
//         return response.data.datas;

//     } catch (error) {
//         throw  new Error("Error during the request for take an association" + error)

//     }

// }



