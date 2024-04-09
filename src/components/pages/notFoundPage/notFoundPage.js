import React from "react";
import { Container } from 'react-bootstrap';
import NotFoundGif from '../../../gifs/NotFoundGif.mp4'

export default function NotFoundPage(){

    return (
        <Container className="mt-5 d-flex justify-content-center text-center ">
            <video style={{maxWidth:'88%'}}  autoPlay loop muted>
                <source src={NotFoundGif} type="video/mp4" />
            </video>
        </Container>
    );
}