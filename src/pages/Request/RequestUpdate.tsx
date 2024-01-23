import { IonButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { updateRequest } from "../../services/api/requests";
import './requestUpdate.css';

export default function UpdateRequest() {

    const params = useParams();
    const event_id: string | undefined = params.id
    console.log("🚀 ~ file: RequestUpdate.tsx:11 ~ updateRequest ~ event_id:", event_id)

    // Get user'datas from storage local
    const user: string | null = localStorage.getItem('user')
    // Converts datas from storage to javascript object
    const userParse: object = JSON.parse(user)
    console.log("🚀 ~ file: RequestUpdate.tsx:17 ~ updateRequest ~ userParse:", userParse)
    // I store the user id
    const user_id: string = userParse.id
    console.log("🚀 ~ file: RequestUpdate.tsx:19 ~ updateRequest ~ user_id:", user_id)


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
    console.log("🚀 ~ file: RequestUpdate.tsx:33 ~ updateRequest ~ request:", request)


    // function triggered when inputs change
    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void {
        const { name, value }: any = e.target;
        setRequest({ ...request, [name]: value })
    }


    // function triggered when submitting the form
    async function handleRequestSubmitForm(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        try {
            const response: object | undefined = await updateRequest(event_id, request)
            console.log("🚀 ~ file: RequestUpdate.tsx:48 ~ handleRequestSubmitForm ~ response:", response)
            if (response.status === 200) {
                console.log('requests succefull');
                setTimeout(() => {
                    location.href = "/tabs/requests"
                })
            }
        } catch (error) {
            console.log("🚀 ~ file: RequestCreate.tsx:46 ~ handleRequestSubmitForm ~ error:", error)
        }
    }

    const handleClick = () => {
        console.log('clique bouton');
        console.log(window.history);
        window.history.back()
    }



    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={handleClick}>Back</IonButton>
                    </IonButtons>

                    <IonTitle>Page mise à jour demande</IonTitle>
                </IonToolbar>
            </IonHeader>
            <h3 className="title_form">Update request</h3>
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