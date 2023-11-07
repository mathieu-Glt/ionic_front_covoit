import { IonButton } from "@ionic/react";

export default function NotFoundPage() {
    return (
      <div>
        <h1>404 - Page not found</h1>
        <img src="https://f.hellowork.com/blogdumoderateur/2013/07/404-homer-550x282.jpg" />
        {/* Autres contenus, liens ou éléments selon vos besoins */}
        <p>Si vous êtes égaré ... </p>
        <IonButton routerLink={`/tabs/assos`}>Help ?</IonButton>

      </div>
    );
  }