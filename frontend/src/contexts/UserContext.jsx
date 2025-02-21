import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserContext = createContext(null);

export const UserProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUser = async() => {
            try{
                const NODE_ENV = import.meta.env.VITE_NODE_DOC_API; 
                const response = await axios.get(`${NODE_ENV}/api/auth/me`, {
                     withCredentials: true 
                    }); 
                
                if(response.status === 401){
                    navigate('/SigninInfo')
                    return;
                }

                setUser(response.data.data);
                setError(null);
            } catch(err){
                console.error("Failed to fetch user:", err);
                setError("Failed to load user data"); // Set the error message
                navigate('/SigninInfo');        
            } finally{
                setLoading(false);
            }
        }

        if(!user){
            fetchUser()  //only fetch user when no user data is present
        }
        else{
            setLoading(false)
        }
    },[navigate,user]);

    return(
        <UserContext.Provider value={{user,loading,error,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;