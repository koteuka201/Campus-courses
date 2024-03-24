
import {Container  } from 'react-bootstrap';


export default function TeachersList({name, email, isMain}){

    return(
        <Container className="border-bottom">
            <div className=" fw-bold">
                {name}
                {isMain ? (
                    <span className="badge bg-success ms-1 text-white">
                        Основной
                    </span>
                ) : (<></>)}
            </div>
            <div style={{opacity: 0.7}} >{email}</div>
        </Container>
    )
}