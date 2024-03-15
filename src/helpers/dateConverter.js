export function dateConvertor(inputDate){
    const parts = inputDate.split('-')

    const date = new Date(parts[0], parts[1] - 1, parts[2].substr(0, 2))

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    const output=`${year}-${month}-${day}`
    
    return output
}