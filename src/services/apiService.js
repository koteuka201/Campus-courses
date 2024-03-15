import axios from 'axios'

const apiURL='https://camp-courses.api.kreosoft.space'

export const login = async (email, password)=>{
    try{
        debugger
        const response = await axios.post(`${apiURL}/login`,{
            email,
            password
        })
        debugger
        return response.data
    } catch(error){
        console.error('An error occurred:', error); // Логируем ошибку в консоль
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
        debugger
        return response.data
    } catch(error){
        console.error('An error occurred:', error);
        console.error('Server response:', error.response.data); 
        return error.response.data;    }
}