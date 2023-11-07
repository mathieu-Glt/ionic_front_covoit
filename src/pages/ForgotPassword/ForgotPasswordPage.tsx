import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import { getUserByEmail, updatePassword } from "../../services/api/user";
// import LoginForm from "../../components/LoginForm/LoginForm";

export default function ForgotPasswordPage() {

const [credentials, setCredentials] = useState<object>({
    password: "",
})
const [credentialsConfirm, setCredentialsConfirm] = useState<object>({
    confirmPassword: "",
})
const [isTouched, setIsTouched] = useState<boolean>(false);

const emailStorage: string | null  = localStorage.getItem("email");


// function triggered when inputs change
const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
        ...prevState,
        [name]: value
    }));
};


// function triggered when submitting the form
async  function handleRegisterForm(evt: FormEvent<HTMLFormElement>): Promise<void> {
    evt.preventDefault();
    try {
        // condition that verify if passwords match
        if(credentials.password === credentials.confirmPassword) {

            // creates a query that checks with the mail whether the user exists
            const response: object | undefined = await getUserByEmail(emailStorage)
            if(response) {
                const userId: string = response._id;
                console.log("🚀 ~ file: ForgotPasswordPage.tsx:43 ~ handleRegisterForm ~ userId:", userId)
                // if it exists, make a request to update the user's password in the DB
                const updatePasswordUser = await updatePassword(userId, credentials)
                console.log("🚀 ~ file: ForgotPasswordPage.tsx:46 ~ handleRegisterForm ~ updatePasswordUser:", updatePasswordUser)
                setCredentials("");
                setCredentialsConfirm("")
            }
            // then redirect the user to the login page
                location.href = "/"
        } else {
            console.log("Passwords do not match!");
            throw new Error('Passwords do not match !')
        }
    } catch (error) {
        console.log("🚀 ~ file: ForgotPasswordPage.tsx:39 ~ handleRegisterForm ~ error:", error)
        
    }

    
}


    return (
        <>

            <ForgotPassword
                handleRegisterForm={handleRegisterForm}
                credentials={credentials}
                credentialsConfirm={credentialsConfirm}
                setIsTouched={setIsTouched}
                handleChange={handleChange}
            />

        </>
    )
}