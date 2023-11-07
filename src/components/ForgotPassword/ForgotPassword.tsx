import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";


export default function ForgotPassword({ credentials, credentialsConfirm, handleRegisterForm, handleChange, setIsTouched }) {
    
    

    return (
        <>
            <form className="ion-padding" onSubmit={handleRegisterForm}>
            <input
            // className={`${isValidEmail && 'ion_valid'} ${isValidEmail === false && 'ion_invalid'} ${isTouched && 'ion-touched'}`} 
                type="password"
                name="password"
                placeholder="Your password"
                value={credentials.password}
                onChange={handleChange}            />
            <input 
            // className={`${isValidPassword && 'ion_valide'} ${isValidPassword === false && 'ion_invalide'} ${isTouched && 'ion-touched'}`} 
                type="password"
                name="confirmPassword"
                placeholder="Your confirm password"
                value={credentialsConfirm.password}
                onChange={handleChange}            />
            <IonButton className="ion-margin-top" type="submit" expand="block">Submit</IonButton>
            </form>

        </>
    )
}