import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg, IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader } from "@ionic/react";
import { useEffect, useState } from 'react';
import { getAllRequestsOfAnUserRelatedToEvent } from "../../services/api/requests";
import ExchangeReadPage from "../../components/Tabs/Exchange/ExchangeReadPage";
import Delete from "../../components/Delete/Delete";
import LogoutButton from "../../components/Logout/Logout";
import './request.css'
export default function RequestListPage() {

    const [requests, setRequests] = useState<object | undefined>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<object | null>(null);

    const userStorage: string | null = localStorage.getItem("user")
    const userParse: object = JSON.parse(userStorage)
    console.log("🚀 ~ file: RequestListPage.tsx:13 ~ RequestListPage ~ userParse:", userParse)
    const idUser: string | undefined = userParse.id
    console.log("🚀 ~ RequestListPage ~ idUser:", idUser)
    
    
    
    useEffect(() => {
        async function loadRequest(): Promise<void> {
            try {
            //  fetch all requests associated to user
            const requests: object | undefined = await getAllRequestsOfAnUserRelatedToEvent(idUser)
            console.log("🚀 ~ file: RequestListPage.tsx:22 ~ loadRequest ~ requests:", requests)
            if (requests) {
                setRequests(requests)
                setIsLoading(false)
            }

            } catch (error) {
                console.log("🚀 ~ file: RequestListPage.tsx:27 ~ loadRequest ~ error:", error)
                setError(new Error("Received unexpected data format from the API" + error))
                setIsLoading(false)
            }
        }
        loadRequest();
    }, [])
    
    console.log("🚀 ~ RequestListPage ~ requests:", requests)

    if (isLoading) {
        return <div>Loading requests...</div>
    };
    
    if (error) {
        return <div>Error: {error.message}</div>
    }


    return (
        <>
            <IonHeader>
                <IonToolbar>
                <div className="navbar">
                    <IonTitle>Liste de mes demandes </IonTitle>
                <LogoutButton />
            </div>
                </IonToolbar>
            </IonHeader>

            <IonContent color="light" >
            <IonList inset={true} >
                {requests ? requests.map((r: any, i) => (
                    <>
                    <IonCard key={r._id}>
                        <IonCardHeader>
                        <IonCardSubtitle > Request n°{i+1}</IonCardSubtitle>
                    <IonCardTitle > Request n°{i+1}</IonCardTitle>

                        </IonCardHeader>
                        {/* <IonCardContent >event : {r.event.description}</IonCardContent> */}
                        <img src="https://www.suisse-normande.com/wp-content/uploads/2023/07/Ex%C3%A9-Affiche-La-boucle-est-Boucl%C3%A9e-BD_page-0001-722x1024.jpg" height='80' width='60'/>
                        <IonCardContent >name : {r.firstname}</IonCardContent>
                        <IonCardContent >departure : {r.departureTime}</IonCardContent>
                        <IonCardContent >address : {r.pickupAddress}</IonCardContent>
                    <IonCardContent >direction : {r.direction}</IonCardContent>
                    <IonCardContent >seat available : {r.nbSeat}</IonCardContent>
                    <IonButton color="warning" routerLink={`/tabs/requests/${r._id}`}>Update request</IonButton>
                    <Delete 
                        request={r._id}
                    />
                    {r.exchanges.map((e: any, i) => [
                        <IonButton color="tertiary" routerLink={`/tabs/exchange/${e}`}>See exchange {i+1}</IonButton>
                    ])}
                    </IonCard>
                    </>
                )) : <div><p>Not requests loading</p></div>}
            </IonList>
            </IonContent>


        </>
    )
}