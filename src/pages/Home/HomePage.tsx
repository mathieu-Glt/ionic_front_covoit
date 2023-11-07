import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";


export default function HomePage() {
    



    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page d'acceuil</IonTitle>
                </IonToolbar>
            </IonHeader>


            <LoginForm/>
        </>
    )

}

