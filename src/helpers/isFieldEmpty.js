export function isFieldEmpty(field, isEmpty){
    if(field==='' && isEmpty){
        return <span className="text-danger">Поле должно быть заполнено!</span>
    }
    else{
        return <></>
    }
}