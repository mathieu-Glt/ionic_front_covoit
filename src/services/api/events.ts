import { useApi } from "../../Hooks/useApi";


// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// call to api back-end for take all events
export async function getAllEvents(): Promise<object | undefined> {
    try {
        const response = await api.get('events');
        console.log("🚀 ~ file: events.ts:12 ~ getAllEvents ~ response:", response)
        
        return response.data.datas;
        
    } catch (error) {
        throw  new Error("Error during the request for take all events" + error)
    }
}

// call to api back-end for take an event by its id
export async function getEventById(id: string | undefined): Promise<object | undefined> {
    console.log("🚀 ~ file: events.ts:25 ~ getEventById ~ id:", id)
    try {
        const response = await api.get(`event/${id}`);
        console.log("🚀 ~ file: events.ts:27 ~ getEvent ~ response:", response)
        
        return response.data.datas;
        
    } catch (error) {
        throw  new Error("Error during the request for take an event" + error)
    }
}

// call to api for take all events related to a association
export async  function getEventRelatedToAssociation(eventId: string): Promise<object | undefined> {
    console.log("🚀 ~ file: events.ts:36 ~ getEventRealtedToAssociation ~ eventId:", eventId)
    try {
        const response = await api.get(`events/byAsso/${eventId}`)
        console.log("🚀 ~ file: events.ts:40 ~ getEventRealtedToAssociation ~ response:", response)
        return response.data.datas;
    } catch (error) {
        console.log("🚀 ~ file: events.ts:41 ~ getEventRealtedToAssociation ~ error:", error)
        throw  new Error("Error during the request for take an event" + error)

    }
    
}