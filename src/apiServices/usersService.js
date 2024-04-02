import axios from 'axios'

import { apiURL } from "./accountService";

export const getRoles= async (token)=>{
    try{
        const response=await axios.get(`${apiURL}/roles`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch(error){
        console.error('An error occurred:', error);
        return error.response.data;
    }
}

export const getUsers= async (token)=>{
    try{
        
        const response=await axios.get(`${apiURL}/users`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        
        return response.data
    } catch(error){
        console.error('An error occurred:', error);
        return error.response.data;
    }
}