import axios from 'axios'

import { apiURL } from './accountService'

export const getGroups= async (token)=>{
    try{
        const response=await axios.get(`${apiURL}/groups`,{
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
export const editGroup= async (token,id,name)=>{
    try{
        const response=await axios.put(`${apiURL}/groups/${id}`,{
            name
        },{
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
export const createGroup= async (token,name)=>{
    try{
        const response=await axios.post(`${apiURL}/groups`,{
            name
        },{
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
export const deleteGroup= async (token,id)=>{
    try{
        const response=await axios.delete(`${apiURL}/groups/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        
        return response
    } catch(error){
        console.error('An error occurred:', error);
        return error.response.data;
    }
}
export const getGroupCourses= async (token,id)=>{
    try{
        
        const response=await axios.get(`${apiURL}/groups/${id}`,{
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