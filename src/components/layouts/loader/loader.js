import { Container } from 'react-bootstrap'
import  {TailSpin}   from 'react-loader-spinner'

export function Loader(){
    return(
        <Container style={{marginTop: '200px'}} className='d-flex justify-content-center' delay={0}>
            <TailSpin
                color="#236fc9"
                height={150}
                width={150}
            />
        </Container>
    )
}