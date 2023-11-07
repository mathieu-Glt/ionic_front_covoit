import { IonRedirect } from "@ionic/react";


export default function PrivateRoutes({ children } : any) {

    const auth: string | null = localStorage.getItem('access_token')
    console.log("🚀 ~ file: PrivateRoute.tsx:7 ~ PrivateRoutes ~ auth:", auth)

    return (
        auth ? children : <IonRedirect to="/" />
    )
}