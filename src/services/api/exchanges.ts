import { useApi } from "../../Hooks/useApi";


// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();


// call to api back-end for take an exchange by its id
export async function getExchangeById(id: string | undefined): Promise<object | undefined> {
    try {
        const response: object | undefined = await api.get(`exchange/${id}`)
        console.log("🚀 ~ file: exchanges.ts:13 ~ getExchangeById ~ response:", response)
        return response?.data.datas;
    } catch (error) {
        throw  new Error("Error during the request for take an exchange" + error)

    }
}
