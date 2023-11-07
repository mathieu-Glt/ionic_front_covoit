import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import './requestCreate.css';
import { createRequest } from "../../services/api/requests";


export default function CreateRequest() {

    const params = useParams();
    // Get the event_id of url
    const event_id: string | undefined = params.id;
    console.log("🚀 ~ file: RequestCreate.tsx:10 ~ createRequest ~ event_id:", event_id)


    // Get user'datas from storage local
    const user: string | null = localStorage.getItem('user')
    console.log("🚀 ~ file: RequestCreate.tsx:13 ~ createRequest ~ user:", user)
    // Converts datas from storage to javascript object
    const userParse: object = JSON.parse(user)
    console.log("🚀 ~ file: RequestCreate.tsx:16 ~ createRequest ~ userParse:", userParse)
    // I store the user id
    const user_id: string = userParse.id
    console.log("🚀 ~ file: RequestCreate.tsx:19 ~ createRequest ~ user_id:", user_id)


    const [request, setRequest] = useState<object>({
        firstname: userParse.firstname,
        eventId: event_id,
        userId: user_id,
        nbSeat: 0,
        direction: "",
        departureTime: "",
        pickupAddress: "",
        type: ""
    })
    console.log("🚀 ~ file: RequestCreate.tsx:35 ~ createRequest ~ request:", request)

    // function triggered when inputs change
    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void {
        const { name, value }: any = e.target;
        setRequest({ ...request, [name]: value})
    }

    // function triggered when submitting the form
    async function handleRequestSubmitForm(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        try {
            // function that create a new request
            const response: object | undefined = await createRequest(event_id, request)
            console.log("🚀 ~ file: RequestCreate.tsx:43 ~ handleRequestSubmitForm ~ response:", response)
        } catch (error) {
            console.log("🚀 ~ file: RequestCreate.tsx:46 ~ handleRequestSubmitForm ~ error:", error)
        }
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page create request user</IonTitle>
                </IonToolbar>
            </IonHeader>
            <h3 className="title_form">Create new request</h3>
            <form className="create_request_from" onSubmit={handleRequestSubmitForm} >
                <label htmlFor="firstname">firstname  </label>
                <input
                    type="text"
                    className=""
                    name="firstname"
                    id="firstname"
                    placeholder={userParse.firstname}
                    onChange={(e) => handleChange(e)}
                    defaultValue={userParse.firstname}
                    disabled
                />
                <label htmlFor="nbSeat">Number  Seat</label>
                <select 
                    className=""
                    name="nbSeat"
                    id="nbSeat"
                    onChange={(e) => handleChange(e)}
                    value={request.nbSeat}>
                        <option value="">Select at least a place</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                </select>
                <label htmlFor="direction">Direction trajet</label>
                <select 
                    className=""
                    name="direction"
                    id="direction"
                    onChange={(e) => handleChange(e)}
                    value={request.direction}>
                        <option value="">Select a direction</option>
                        <option value="complet">Complet</option>
                        <option value="Aller">Aller</option>
                        <option value="Retour">Retour</option>
                </select>
                <label htmlFor="departureTime">Departure hour</label>
                <input
                    type="time"
                    className=""
                    name="departureTime"
                    id="departureTime"
                    placeholder={userParse.departureTime}
                    onChange={(e) => handleChange(e)}
                    value={userParse.departureTime}
                />
                <label htmlFor="type">Announcement</label>
                <select 
                    className=""
                    name="type"
                    id="type"
                    onChange={(e) => handleChange(e)}
                    value={request.type}>
                        <option value="">What type announcement ?</option>
                        <option value="Demande">Aller</option>
                        <option value="Propose">Retour</option>
                </select>
                <label htmlFor="pickupAddress">Address meeting</label>
                <input
                    type="text"
                    className=""
                    name="pickupAddress"
                    id="pickupAddress"
                    placeholder={userParse.pickupAddress}
                    onChange={(e) => handleChange(e)}
                    value={userParse.pickupAddress}
                />
                <input name="userId" value={request.userId} type="hidden" />
                <input name="eventId" value={request.eventId} type="hidden" />
                <button type="submit">Submit</button>
            </form>

        </>
    )

}