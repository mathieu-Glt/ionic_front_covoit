import { IonHeader, IonTitle, IonNav, IonToolbar, IonNavLink, IonContent, IonItem, IonLabel, IonList, IonButton, IonImg, IonCard, IonCardTitle } from "@ionic/react";
import { useEffect, useState } from 'react';
import { getEventRelatedToAssociation } from "../../services/api/events";
import { findAssociationRelatedUser } from "../../services/api/association";



export default function EventListPage() {

  const [events, setEvents] = useState<object | undefined>({});
  const [user, setUser] = useState<object | undefined>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const userStorage: string | null = localStorage.getItem("user")
  const userParse = JSON.parse(userStorage)
  const idUser: string | undefined = userParse.id
  const arr: any[] = [];



  useEffect(() => {
    // function that load events
    async function loadEvents() {
      try {
        //  request that searches associations related to a user
        const assos: object | undefined = await findAssociationRelatedUser(idUser);
        console.log("🚀 ~ file: EventListPage.tsx:27 ~ loadEvents ~ assos:", assos)
        if (assos) {
          // the result gives several associations so we will loop on the ids of each association
          for (const asso of assos) {
            console.log("🚀 ~ file: AssociationListPage.tsx:50 ~ loadAssociations ~ asso:", asso.id)
            // query that retrieves one or many event(s) related to an association 
            const events = await getEventRelatedToAssociation(asso.id)
            console.log("🚀 ~ file: EventListPage.tsx:34 ~ loadEvents ~ events:", events)
            if (events) {
              arr.push(events)
              const nonEmptyEvents = arr.filter(events => events.length > 0)
              console.log("🚀 ~ file: EventListPage.tsx:5500 ~ loadEvents ~ nonEmptyEvents:", nonEmptyEvents)

              setEvents(nonEmptyEvents[0]);
              setIsLoading(false)

            }
            // console.log("🚀 ~ file: AssociationListPage.tsx:55 ~ loadAssociations ~ events:", events)

          }

        }

      } catch (error) {
        console.log("🚀 ~ file: EventListPage.tsx:13 ~ loadUser ~ events:", error)
        setError(error)
        setIsLoading(false)
      }
    }
    loadEvents();
  }, [])



  if (isLoading) {
    return <div>Loading events...</div>
  };

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Page évènements</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" >

        <IonList inset={true} >
          {events ? events.map((e: any, i) => (
            <>
              <IonCard color="light">
                <IonImg src="https://www.suisse-normande.com/wp-content/uploads/2023/07/Ex%C3%A9-Affiche-La-boucle-est-Boucl%C3%A9e-BD_page-0001-722x1024.jpg" ></IonImg>
                <IonItem key={e._id}>
                  <IonLabel key={e._id}>{e.name}</IonLabel>
                  <IonButton routerLink={`/tabs/events/${e._id}`}>Details</IonButton>

                </IonItem>

              </IonCard>
            </>
          )) : <div><p>Not events loading</p></div>}
        </IonList>
      </IonContent>

    </>
  );





}