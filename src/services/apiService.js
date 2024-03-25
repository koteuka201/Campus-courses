import axios from 'axios'

const apiURL='https://camp-courses.api.kreosoft.space'
//все что связано с юзером
export const login = async (email, password)=>{
    try{
        
        const response = await axios.post(`${apiURL}/login`,{
            email,
            password
        })
        
        return response.data
    } catch(error){
        console.error('An error occurred:', error);
        // throw error.response.statusText;
    }
}


export const registation = async (email, password, fullName, birthDate, confirmPassword)=>{
    try{
        const response = await axios.post(`${apiURL}/registration`,{
            fullName,
            birthDate,
            email,
            password,
            confirmPassword
        })
        
        return response.data
    } catch(error){
        console.error('An error occurred:', error);
        console.error('Server response:', error.response.data); 
        return error.response.data;    }
}

export const getProfile= async (token)=>{
    try{
        const response=await axios.get(`${apiURL}/profile`,{
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
export const logout= async (token)=>{
    try{
        const response=await axios.post(`${apiURL}/logout`,{},{
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
export const putProfile= async (fullName,birthDate,token)=>{
    try{
        const response=await axios.put(`${apiURL}/profile`,{
            fullName,
            birthDate
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

//группы курсов
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

//курсы
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
        debugger
        const response=await axios.put(`${apiURL}/courses/${id}/requirements-and-annotations`,{
            requirements,
            annotations
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        debugger
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
