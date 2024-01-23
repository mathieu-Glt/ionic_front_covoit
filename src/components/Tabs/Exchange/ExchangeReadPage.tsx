import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg, IonCard, IonCardTitle, IonCardContent, IonBackButton, IonButtons } from "@ionic/react";
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { getExchangeById } from "../../../services/api/exchanges";
import './exchange.css'
import { getAllRequestsOfAnUserRelatedToEvent } from "../../../services/api/requests";


export default function ExchangeReadPage() {

    const [exchange, setExchange] = useState<object | undefined>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const params = useParams()
    console.log("🚀 ~ file: ExchangeReadPage.tsx:13 ~ ExchangeReadPage ~ params:", params)
    const id: string | undefined = params.id
    console.log("🚀 ~ file: ExchangeReadPage.tsx:17 ~ ExchangeReadPage ~ id:", id)
    const userStorage: string | null = localStorage.getItem("user")
    const userParse: object = JSON.parse(userStorage)
    console.log("🚀 ~ file: RequestListPage.tsx:13 ~ RequestListPage ~ userParse:", userParse)
    const idUser: string | undefined = userParse.id


    useEffect(() => {
        // function that load exchange with its id
        async function loadExchangeById(): Promise<void> {
            try {
                const exchange: object | undefined = await getExchangeById(id)
                const requests: object | undefined = await getAllRequestsOfAnUserRelatedToEvent(idUser)
                console.log("🚀 ~ file: ExchangeReadPage.tsx:29 ~ loadExchangeById ~ requests:", requests)

                setExchange(exchange)
                setIsLoading(false)

                console.log("🚀 ~ file: ExchangeReadPage.tsx:22 ~ loadExchangeById ~ exchange:", exchange.status[0])
            } catch (error) {
                console.log("🚀 ~ file: ExchangeReadPage.tsx:27 ~ loadExchangeById ~ error:", error)
                setError(error)
                setIsLoading(false)
    
            }

        }
        loadExchangeById()
    }, [id])

    // function that returns a color according to the status in the parameter
    function getStatusClass(status: string): string | undefined {
        switch (status) {
            case 'refusé':
                return 'red'
                break;
            case 'confirmé':
                return 'green'
                break;
            case 'attente':
                return 'gold'
                break;
                        
            default:
                break;
        }
    }
    if (isLoading) {
        return <div>Loading event...</div>
    };
          
    if (error) {
              return <div>Error: {error.message}</div>
    }



    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Echange </IonTitle>
                </IonToolbar>
                <IonButtons slot="start">
                {/* <IonBackButton defaultHref="/tabs/requests" /> */}
            <IonBackButton defaultHref="/"/>
                </IonButtons>
                
            </IonHeader>
            <IonCard color="light">
            <IonCardContent>Demande de : {exchange.firstname}</IonCardContent>
            <IonCardContent>Direction du trajet : {exchange.direction}</IonCardContent>
            <IonCardContent>Nombre place disponible : {exchange.nbSeat}</IonCardContent>
            <IonCardContent style={{ background : getStatusClass(exchange.status[0])}}>Status de la demande : {exchange.status[0]}</IonCardContent>

            </IonCard>
        </>

    )


}