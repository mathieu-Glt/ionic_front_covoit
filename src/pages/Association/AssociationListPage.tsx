import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg, IonCard } from "@ionic/react";
import { useEffect, useState } from 'react';
import { findAssociationRelatedUser } from "../../services/api/association";
import pathPicture from '../../assets/association/1.jpg'
import { getEventRelatedToAssociation } from "../../services/api/events";

export default function AssociationListPage() {


    const [assos, setAssos] = useState<object | undefined>({});
    const [user, setUser] = useState<object | undefined>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const pathPicture = import.meta.env.VITE_ACCESS_PICTURE
    // const baseURL: import.meta.env.VITE_ACCESS_PICTURE
    const userStorage: string | null = localStorage.getItem("user")
    const userParse: object = JSON.parse(userStorage)
    const idUser: string = userParse.id
    console.log("🚀 ~ file: AssociationListPage.tsx:21 ~ AssociationListPage ~ idUser:", idUser)





    useEffect(() => {
        async function loadAssociations(): Promise<void> {
            try {
                //  function that searches for associations related with the user connected to application
                const assos: object | undefined = await findAssociationRelatedUser(idUser);
                console.log("🚀 ~ file: Association.tsx:35 ~ loadAssociations ~ assos:", assos)
                if (assos) {
                    setAssos(assos)
                    setIsLoading(false)
                }

            } catch (error) {
                console.log("🚀 ~ file: Association.tsx:38 ~ loadAssociations ~ error:", error)
                setError(error)
                setIsLoading(false)

            }
        }
        loadAssociations();
    }, [user])






    if (isLoading) {
        return <div>Loading associations...</div>
    };

    if (error) {
        return <div>Error: {error.message}</div>
    }



    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page associations</IonTitle>
                </IonToolbar>
            </IonHeader>
            {isLoading ?
                <div>Loading associations...</div> :
                <IonContent color="light" >
                    <IonList inset={true}>
                        {assos && assos.map((a: any, i) => (
                            <>
                                {/* <IonCard color="light"> */}
                                <IonCard>
                                    <IonImg key={i} src="https://www.scionzier.fr/wp-content/uploads/2023/07/forum-des-asso_page-0001.jpg"></IonImg>
                                    <IonItem key={a._id}>
                                        <IonLabel>{a.name}</IonLabel>
                                        {/* <IonLabel>{e.description}</IonLabel> */}
                                        <IonButton routerLink={`/tabs/association/${a.id}`}>Details</IonButton>
                                    </IonItem>
                                </IonCard>
                            </>
                        ))

                        }
                    </IonList>
                </IonContent>

            }
        </>
    )


}