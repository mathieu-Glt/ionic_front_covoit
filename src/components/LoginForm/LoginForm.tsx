import { IonInputCustomEvent, InputInputEventDetail, InputChangeEventDetail } from "@ionic/core";
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonRouterLink, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { FormEvent, useRef, useState } from "react";
import axios from 'axios';
import './loginForm.css'
import { useLocalStorage } from "../../Hooks/useLocalStorage";
import { loginUser } from "../../services/api/auth";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";


export default function LoginForm() {


    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [isValidEmail, setIsValidEmail] = useState<boolean>();
    const [isValidPassword, setIsValidPassword] = useState<boolean>();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const STORAGE_USER: string = "user";
    const FORGOT_USER: string = "email";
    const ACCESSTOKEN: string = "access_token";
    const REFRESHTOKEN: string = "refresh_token";
    const [storeUser, setStoreUser] = useLocalStorage(STORAGE_USER, {})
    const [user, setUser] = useState<object>({
        email: "",
        password: "",
    })
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    

    // function triggered when submitting the form
    async function handleSubmit(evt: FormEvent<HTMLFormElement>): Promise<void> {
        evt.preventDefault();
        console.log("Je suis dans le handlesubmit");
        console.log("🚀 ~ file: LoginForm.tsx:24 ~ LoginForm ~ email:", email)
        console.log("🚀 ~ file: LoginForm.tsx:25 ~ LoginForm ~ password:", password)
        const regexPassword = /^[0-9a-zA-Z\s!@#$%&/*]{3,14}$/
        const regexEmail = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        
        try {
            // check that email and password match with regexEmail and regexPassword with the javascript test method
            if (regexEmail.test(email) && regexPassword.test(password)) {
                console.log('pattern found!');
                const body = {
                    "email": email,
                    "password": password
                }
                // launches the user login function
                const response: object | undefined = await loginUser(body);
                console.log("🚀 ~ file: LoginForm.tsx:53 ~ handleSubmit ~ response:", response)
                if(response.status === 200) {
                    console.log('GREAT!');
                    
                    //store  user in storage local
                    const user = {
                        id: response?.data.datas.user._id,
                        firstname: response?.data.datas.user.firstname,
                        lastname: response?.data.datas.user.lastname,
                        email: response?.data.datas.user.email,
                        isActive: response?.data.datas.user.isActive,
                        type: response?.data.datas.user.type,
                        association: response?.data.datas.user.associations
                    }
                    console.log("🚀 ~ file: LoginForm.tsx:66 ~ handleSubmit ~ user:", user)

                    setStoreUser(user);

                    //store access_token and refresh_token in storage loccal
                    localStorage.setItem(ACCESSTOKEN, response?.data.datas.tokens.accessToken)
                    localStorage.setItem(REFRESHTOKEN, response?.data.datas.tokens.refreshToken)
                    
                    setUser({
                        email: "",
                        password: "",
                    })

                } 
                location.href = "/tabs/events";
                
                
            } else {
                console.log('pattern not found!');
            }
            
            
            
        } catch (error) {
            console.log("🚀 ~ file: LoginForm.tsx:61 ~ handleSubmit ~ error:", error)
        }
    }
    
    // string email capture if matches pattern
    const validateEmail = (email: string) => {
        return email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            );
        };
    // string password capture if matches pattern 
    const validatePassword = (pass: string) => {
          return pass.match(/^[0-9a-zA-Z\s!@#$%&/*]{8,14}$/
          );
        };
        

        // checking function of email input 
      const validate = (ev: Event): void => {
          const value = (ev.target as HTMLInputElement).value;
          
          setIsValidEmail(undefined);
          
          if (value === '') return;
          
          // if validateEmail is not null the method returns true if empty it returns false
          validateEmail(value) !== null ? setIsValidEmail(true) : setIsValidEmail(false);
          setEmail(value)
        };
        
        // checking function of password input 
        const valid = (ev: Event): void => {
            const value = (ev.target as HTMLInputElement).value;
            
            setIsValidPassword(undefined);
            
            if (value === '') {
                return;
            }

            // if validatePassword is not null the method returns true if empty it returns false
            validatePassword(value) !==null ? setIsValidPassword(true) : setIsValidPassword(false);
            setPassword(value)
            
        }
        
        
        // triggerd method  when onIonBlur prop of input call it
        const markTouched = (): void =>  {
            setIsTouched(true);
        };
        
        
        // function that captures the email as input and, if the conditions are met, the email is stored in local storage
        function confirm(): void {

            const email = input.current?.value

            if(email !== null) {
                console.log('La valeur de input ', email);
                
                modal.current?.dismiss(input.current?.value, 'confirm');

                if(typeof(email) === "string") {

                    localStorage.setItem(FORGOT_USER, email)
                }

                setTimeout(() => {
                    
                    location.href="/forgotpassword"
                }, 1000)
            }
        }
        
        function onWillDismiss(ev: CustomEvent<OverlayEventDetail>): void {
            if (ev.detail.role === 'confirm') {
                setEmail(`Email, ${ev.detail.data}!`);
            }
        }

        
        return (
        <>
            <IonTitle>Formulaire de connexion :</IonTitle>
            <br/>
            <form className="ion-padding" onSubmit={handleSubmit}>
            <IonInput
            className={`${isValidEmail && 'ion_valid'} ${isValidEmail === false && 'ion_invalid'} ${isTouched && 'ion-touched'}`} 
                label="Enter your email" 
                label-placement="floating" 
                fill="solid" 
                placeholder="math@yahoo.fr"
                onIonInput={(event) => validate(event)}
                onIonBlur={() => markTouched()}
                />
            <IonInput 
            className={`${isValidPassword && 'ion_valide'} ${isValidPassword === false && 'ion_invalide'} ${isTouched && 'ion-touched'}`} 
                label="Enter your password" 
                label-placement="floating" 
                fill="outline" 
                placeholder="password"
                onIonInput={(event) => valid(event)}
                onIonBlur={() => markTouched()}
            />
            <IonButton className="ion-margin-top" type="submit" expand="block">Submit</IonButton>
            {/* <IonButton className="ion-margin-top"  onClick={openModal}>Mot de passe oublié ?</IonButton> */}
            <IonButton id="open-modal" expand="block">
                Forgot password ?
            </IonButton>
            </form>
                    <IonModal ref={modal} trigger="open-modal" onSubmit={(ev) => onWillDismiss(ev)}>
                        <IonHeader>
                            <IonToolbar>
                                <IonButtons slot="start">
                                    <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                                </IonButtons>
                                    <IonTitle>Forgot password</IonTitle>
                                <IonButtons slot="end">
                                    <IonButton strong={true} onClick={() => confirm()}>Confirm</IonButton>
                                </IonButtons>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent className="ion-padding">
                            <IonItem>
                                <IonInput
                                    label="Enter your email"
                                    labelPlacement="stacked"
                                    type="text"
                                    ref={input}
                                    placeholder="Your email"
                                />
                            </IonItem>
                        </IonContent>
                    </IonModal>

        </>
    )
}