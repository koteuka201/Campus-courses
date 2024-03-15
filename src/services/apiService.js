import axios from 'axios'

const apiURL='https://camp-courses.api.kreosoft.space'

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
        debugger
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