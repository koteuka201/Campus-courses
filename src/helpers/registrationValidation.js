export function isPasswordValid(password){
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]{6,})/
    return passwordRegex.test(password)
}
export  function isEmailValid(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}