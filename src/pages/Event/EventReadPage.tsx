import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg, IonCard, IonCardTitle, IonCardContent } from "@ionic/react";
import { useEffect, useState } from 'react';
import { getEventById } from "../../services/api/events";
import { useParams } from "react-router";



export default function EventReadPage() {

    const [event, setEvent] = useState<object | undefined>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const params = useParams()
    console.log("🚀 ~ file: EventReadPage.tsx:12 ~ EventReadPage ~ params:", params)
    const id: string | undefined = params.id

    
    
    useEffect(() => {
        //  function that get an event by its id
        async function loadEventById(): Promise<void> {
          try {
            const event: object | undefined = await getEventById(id);
            if(event) {
                setEvent(event);
                setIsLoading(false)
            }

            
        } catch (error) {
            console.log("🚀 ~ file: EventReadPage.tsx:23 ~ loadEventById ~ error:", error)
            setError(error)
            setIsLoading(false)
            
        }
    }
    loadEventById();
}, [id])


if (isLoading) {
    return <div>Loading event...</div>
      };
      
      if (error) {
          return <div>Error: {error.message}</div>
        }
        
        
        console.log("🚀 ~ file: EventReadPage.tsx:13 ~ loadEventById ~ event:", event)
      return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page d'un évènement</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonCard color="light">
                <IonImg src="https://www.africatopsports.com/wp-content/uploads/2015/03/france.jpg" ></IonImg>
                <IonCardTitle>{event.name}</IonCardTitle>
                <IonCardContent>{event.description}</IonCardContent>
                <IonCardContent>participants : {event.participant}</IonCardContent>
                <IonCardContent>date : {event.endDate}</IonCardContent>
                <IonCardContent>heure : {event.endTime}</IonCardContent>
                <IonButton color="secondary" routerLink={`/tabs/requests/add/${event._id}`}>Create request</IonButton>
            </IonCard>
  
        </>
      )
    
    
}