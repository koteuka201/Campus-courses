import axios from 'axios'

import { apiURL } from './accountService'

export const createCourse= async (token,id, name,startYear,maximumStudentsCount,semester,requirements,annotations,mainTeacherId)=>{
    try{
        const response=await axios.post(`${apiURL}/groups/${id}`,{
            name,
            startYear,
            maximumStudentsCount,
            semester,
            requirements,
            annotations,
            mainTeacherId
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
//
export const getTeachingCourses= async (token)=>{
    try{
        
        const response=await axios.get(`${apiURL}/courses/teaching`,{
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
export const getCourseDetails= async (token,id)=>{
    try{
        
        const response=await axios.get(`${apiURL}/courses/${id}/details`,{
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
export const editCourseDetails= async (token,id, name,startYear,maximumStudentsCount,semester,requirements,annotations,mainTeacherId)=>{
    try{
        
        const response=await axios.put(`${apiURL}/courses/${id}`,{
            name,
            startYear,
            maximumStudentsCount,
            semester,
            requirements,
            annotations,
            mainTeacherId
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
export const editCourseTeacherDetails= async (token,id, requirements,annotations)=>{
    try{
        
        const response=await axios.put(`${apiURL}/courses/${id}/requirements-and-annotations`,{
            requirements,
            annotations
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
export const deleteCourse= async (token,id)=>{
    try{
        
        const response=await axios.delete(`${apiURL}/courses/${id}`,{
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
export const editStatusCourse= async (token,id, status)=>{
    try{
        const response=await axios.post(`${apiURL}/courses/${id}/status`,{
            status
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
export const createNotification= async (token,id, text,isImportant)=>{
    try{
            
        const response=await axios.post(`${apiURL}/courses/${id}/notifications`,{
            text,
            isImportant
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
export const addTeacherCourse= async (token,id, userId)=>{
    try{
            
        const response=await axios.post(`${apiURL}/courses/${id}/teachers`,{
            userId
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
export const setMarkStudent= async (token,id, studentId,mark, markType)=>{
    try{
            
        const response=await axios.post(`${apiURL}/courses/${id}/marks/${studentId}`,{
            mark,
            markType
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
export const signUpForCourse= async (token,id)=>{
    try{
            
        const response=await axios.post(`${apiURL}/courses/${id}/sign-up`,{
            
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
export const editStatusOfSignUp= async (token,studentId,courseId,status)=>{
    try{
            
        const response=await axios.post(`${apiURL}/courses/${courseId}/student-status/${studentId}`,{
            status
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
export const getMyCourses= async (token)=>{
    try{
        
        const response=await axios.get(`${apiURL}/courses/my`,{
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