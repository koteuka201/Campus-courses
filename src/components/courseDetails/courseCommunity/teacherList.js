
import {Container  } from 'react-bootstrap';


export default function TeachersList({name, email, isMain}){

    return(
        <Container className="border-bottom">
            <div className=" fw-bold">
                {name}
                {isMain ? (
                    <span className="rounded bg-success ms-1 text-white">
                        <span className="me-2 ms-2">Основной</span>
                    </span>
                ) : (<></>)}
            </div>
            <div style={{opacity: 0.7}} >{email}</div>
        </Container>
    )
}