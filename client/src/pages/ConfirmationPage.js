import { Col, Container, Row } from "react-bootstrap";


export function ConfirmationPage(){
    
    return(
        <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1>Vásárlás sikeres</h1>
                    </Col>
                    <p>
                        Köszönjük vásárlásod ha bármi kérdésed lenne az elérhetőségeknél a kiválasztott módon fel tudod venni velunk a kapcsolatot,
                    </p>
                </Row>
            </Container>
    )
}