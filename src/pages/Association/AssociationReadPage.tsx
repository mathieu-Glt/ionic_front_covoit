import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg, IonCard, IonCardTitle, IonCardContent, IonBackButton, IonButtons } from "@ionic/react";
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { getAssociationById } from "../../services/api/association";
import AssociationListPage from "./AssociationListPage";
import LogoutButton from "../../components/Logout/Logout";

export default function AssociationReadPage() {

    const [association, setAssociation] = useState<object | undefined>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const params = useParams()
    const id: string | undefined = params.id



    useEffect(() => {
        // function that load an association by its id
        async function loadAssoById(): Promise<void> {
            try {
                const event: object | undefined = await getAssociationById(id);
                if (event) {
                    setAssociation(event);
                    setIsLoading(false)
                }


            } catch (error) {
                console.log("🚀 ~ file: EventReadPage.tsx:23 ~ loadEventById ~ error:", error)
                setError(error)
                setIsLoading(false)

            }
        }
        loadAssoById();
    }, [id])

    const handleClick = () => {
        console.log('clique bouton');
        console.log(window.history);
        window.history.back()
    }

    if (isLoading) {
        return <div>Loading an association...</div>
    };

    if (error) {
        return <div>Error: {error.message}</div>
    }
    console.log("🚀 ~ file: AssociationReadPage.tsx:9 ~ function ~ association:", association)


    return (
        <>
            <IonHeader>
                <IonToolbar>
                <div className="navbar">
                    <IonButtons slot="start">
                            <IonButton onClick={handleClick}>Back</IonButton>
                    </IonButtons>
                    <IonTitle>Page association</IonTitle>
                    <LogoutButton />
                </div>
                </IonToolbar>
            </IonHeader>

            <IonCard color="light">
                <IonImg src="https://www.commune-baugy18.fr/files/actualites/images-descriptives/affiche_cine_2022.jpg" ></IonImg>
                <IonCardTitle>{association.name}</IonCardTitle>
                <IonCardContent>{association.description}</IonCardContent>

            </IonCard>


        </>
    )

}