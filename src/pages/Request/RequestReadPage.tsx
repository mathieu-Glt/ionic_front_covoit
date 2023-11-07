import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg, IonCard, IonCardTitle, IonCardContent } from "@ionic/react";
import { useEffect, useState } from 'react';
import { useParams } from "react-router";



export default function RequestReadPage( ){

    const [request, setRequest] = useState<object | undefined>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const params = useParams()
    console.log("🚀 ~ file: RequestReadPage.tsx:13 ~ RequestReadPage ~ params:", params)
    const id = params.id

    // useEffect

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
                    <IonTitle>Page d'une demande</IonTitle>
                </IonToolbar>
            </IonHeader>
        </>

    )
    


}
