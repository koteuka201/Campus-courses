export function isDateValid(date){
    if(new Date(date)>new Date() || date<'1900-01-01'){
        return false
    }
    else{
        return true
    }
}