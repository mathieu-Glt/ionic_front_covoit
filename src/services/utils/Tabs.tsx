import {
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonRedirect,
    IonRoute,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
import React from "react";
import { ellipse, square, triangle } from "ionicons/icons";
import EventListPage from "../../pages/Event/EventListPage";
import { Route } from "react-router-dom";
import AssociationListPage from "../../pages/Association/AssociationListPage";
import EventReadPage from "../../pages/Event/EventReadPage";
import AssociationReadPage from "../../pages/Association/AssociationReadPage";
import RequestListPage from "../../pages/Request/RequestListPage";
import ExchangeReadPage from "../../components/Tabs/Exchange/ExchangeReadPage";
import NotFoundPage from "./Page404";
import CreateRequest from "../../pages/Request/RequestCreate";
import UpdateRequest from "../../pages/Request/RequestUpdate";
// import ForgotPasswordPage from "../../pages/ForgotPassword/ForgotPasswordPage";


const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>


            <Route exact path="/tabs/requests/:id" component={UpdateRequest} />
            <Route exact path="/tabs/requests/add/:id" component={CreateRequest} />
            <Route exact path="/tabs/exchange/:id" component={ExchangeReadPage} />
            <Route exact path="/tabs/requests" component={RequestListPage} />
            <Route exact path="/tabs/association/:id" component={AssociationReadPage} />
            <Route exact path="/tabs/assos" component={AssociationListPage} />
            <Route exact path="/tabs/events" component={EventListPage} />
            <Route exact path="/tabs/events/:id" component={EventReadPage} />
                <Route exact path="/tabs">
                    <IonRedirect to="/login" />
                </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
                <IonTabButton tab="association" href="/tabs/assos">
                    <IonIcon aria-hidden="true" icon={square} />
                    <IonLabel>Association</IonLabel>
                </IonTabButton>
                <IonTabButton tab="events" href="/tabs/events">
                    <IonIcon aria-hidden="true" icon={triangle} />
                    <IonLabel>Events</IonLabel>
                </IonTabButton>
                <IonTabButton tab="request" href="/tabs/requests">
                    <IonIcon aria-hidden="true" icon={ellipse} />
                    <IonLabel>Requests</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Tabs;


  
