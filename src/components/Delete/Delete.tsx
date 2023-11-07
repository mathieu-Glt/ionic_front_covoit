import { IonButton } from "@ionic/react";
import {  deleteRequest } from "../../services/api/requests";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { log } from "console";


export default function Delete({ request }) {
console.log("🚀 ~ file: Delete.tsx:8 ~ Delete ~ request:", request)

// const location = useLocation();
// console.log("🚀 ~ file: Delete.tsx:12 ~ Delete ~ location:", location)

// function triggered when click delete button
async function HandleDelete(e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>): Promise<void> {
    e.preventDefault();
    console.log('Je suis dans le handleDelete');
    console.log('params id request : ', request);
    
    
    try {
        // function that delete a request by its id
        const deleteRe: object | undefined = await deleteRequest(request)
        console.log("🚀 ~ file: Delete.tsx:18 ~ HandleDelete ~ deleteRequest:", deleteRe)
        if(deleteRe.status === 200) {
            console.log('requests succefull');
            setTimeout(() => {
               location.href = "/tabs/requests"
            })
            
        }
    } catch (error) {
        console.log("🚀 ~ file: Delete.tsx:21 ~ HandleDelete ~ error:", error)
        
    }
    
}



return(

    <IonButton color="danger" onClick={HandleDelete}>Delete request</IonButton>
)
}

