import {handleError} from "@/Helpers/handleError.jsx";
import axios from 'axios';

const api="https://localhost:44301/api/";

export const LoginAPI=async (username, password)=>{
    try{
        
        console.log(username);
        const data= await axios.post
            (api+"account/login",{username, password}
            
            
            )
                
            
        return data
        
    }catch(err){
        console.error('Request failed:', err);
        handleError(err)
    }
    
    
}

export const RegisterAPI=async (username,email, password)=>{
    try{
        console.log(username);
        const data= await axios.post
        (api+"account/register",{username,email, password}


        )
        console.log(data)
        return data
        
    }catch(err){
        handleError(err)
    }
}

export const LogoutAPI=async ()=>{
    try{
        const data= await axios.post
        (api+"account/logout"


        )
        return data

    }catch(err){
        handleError(err)
    }
}

