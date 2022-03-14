import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ConfirmationContext } from "../App";



export function ConfirmationPage(){
    const [confirmation] = useContext(ConfirmationContext);
    

    return(
        <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="cimsor">Vásárlás sikeres</h1>
                    </Col>
                    <p>
                        a vásárlásodnak a száma {confirmation}
                    </p>
                </Row>
            </Container>
    )
}