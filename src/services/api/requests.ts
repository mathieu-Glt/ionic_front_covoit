import { useApi } from "../../Hooks/useApi";
import { RequestInterface } from "../../interface/request.interface";

const api = useApi()


// function that searches all requests of an user that related to event 
export async function getAllRequestsOfAnUserRelatedToEvent(userId: string): Promise<object | undefined> {
    try {
        const response = await api.get(`requests/user/${userId}`)
        console.log("🚀 ~ file: requests.ts:11 ~ getAllRequestsOfAnUserRelatedToEvent ~ getRequests:", response)
        return response.data.datas;
    } catch (error) {
        throw  new Error("Error during the request " + error)
        
    }
}

// function that create request related to event
export async function createRequest(id: string, body: RequestInterface): Promise<object | undefined> {
    try {
        const createRequest = await api.post(`request/create/${id}`, body);
        console.log("🚀 ~ file: requests.ts:23 ~ createRequest ~ createRequest:", createRequest)
        return createRequest;

    } catch (error) {
        throw new Error("Error during the request " + error)
    }
}

// function that update request by its id
export async function updateRequest(id: string, body: RequestInterface): Promise<object | undefined> {
    try {
        const update = await api.put(`request/update/${id}`, body)
        console.log("🚀 ~ file: requests.ts:35 ~ updateRequest ~ update:", update)
        return update;
    } catch (error) {
        console.log("🚀 ~ file: requests.ts:37 ~ updateRequest ~ error:", error)
        throw new Error("Error during the request " + error)

    }
}


// function that delete request by its id
export async function deleteRequest(id: string): Promise<object | undefined> {
    try {
        const deleteRequest = await api.delete(`request/delete/${id}`)
        console.log("🚀 ~ file: requests.ts:49 ~ deleteRequest ~ deleteRequest:", deleteRequest)
        return deleteRequest;
    } catch (error) {
        console.log("🚀 ~ file: requests.ts:51 ~ deleteRequest ~ error:", error)
        throw new Error("Error during the request " + error)

    }
}
