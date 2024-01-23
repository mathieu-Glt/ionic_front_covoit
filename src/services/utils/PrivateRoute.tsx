import { IonRedirect } from "@ionic/react";
import { Redirect } from "react-router";


export default function PrivateRoutes({ children } : any) {

    const auth: string | null = localStorage.getItem('access_token')
    console.log("🚀 ~ file: PrivateRoute.tsx:7 ~ PrivateRoutes ~ auth:", auth)

    return (
        auth ? children : <Redirect to="/" />
    )
}