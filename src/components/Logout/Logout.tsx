import React, { useEffect, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import './logout.css';
import { IonButton } from '@ionic/react';
import { setEngine } from 'crypto';
import { logout } from '../../services/api/auth';
import { Redirect } from "react-router";


export default function LogoutButton() {
    
    const [isLogged, setIsLogged] = useState(false)


    const handleLogout = async () => {
        const result = await logout();
        console.log("🚀 ~ file: Logout.tsx:16 ~ handleLogout ~ result:", result)
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user')
        
        window.location.href = "/";
        // <Redirect to="/" />
    }

    useEffect(() => {

        const accessToken: string | null = localStorage.getItem("access_token")
        console.log("🚀 ~ file: Logout.tsx:14 ~ useEffect ~ accessToken:", accessToken)
        
        const refreshToken: string | null = localStorage.getItem("refresh_token")
        console.log("🚀 ~ file: Logout.tsx:21 ~ useEffect ~ refreshToken:", refreshToken)

        const user = localStorage.getItem("user")
        console.log("🚀 ~ file: Logout.tsx:27 ~ useEffect ~ user:", user)
        const parseUser = user ? JSON.parse(user) : null
        console.log("🚀 ~ file: Logout.tsx:30 ~ useEffect ~ parseUser:", parseUser)


        if(accessToken) {
            setIsLogged(true)
        } 
    }, [])


 

  return (
    <div>
        {isLogged ? <IonButton onClick={handleLogout} color="danger"><LogoutIcon className='logout'/></IonButton> : null }
    </div>
  )
}
