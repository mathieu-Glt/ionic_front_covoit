import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@ionic/react/css/core.css';
import { IonApp, IonButton, IonDatetime, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import PrivateRoutes from './services/utils/PrivateRoute';
import EventListPage from './pages/Event/EventListPage';
import Tabs from './services/utils/Tabs';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage';
import NotFoundPage from './services/utils/Page404';
import createRequest from './pages/Request/RequestCreate';

setupIonicReact();

function App() {

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
          {/* <Route exact path="*" component={NotFoundPage} /> */}

          
          <Route path='/tabs'>
            <PrivateRoutes>
              <Tabs />
            </PrivateRoutes>
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>

    </IonApp>
  )
}

export default App
