import axios from "axios";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ConfirmationContext, ShoppingCartContext, UserContext } from "../App";
import { updateFormValue } from "./CreateProductPage";

const DEFAULT_FORM_OBJECT = {
        address:'',
        firstname:'',
        lastname:'',
        cardNumber:''
    };
    
export function CheckOutPage(){   
    
    

    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const [cart, setCart] = useContext(ShoppingCartContext);
    const navigate = useNavigate();
    const [confirmation, setConfirmation] = useContext(ConfirmationContext);
    const {user} = useContext(UserContext);

    const checkOut = async (e) => {
        e.preventDefault();
        const {data: orders } = await axios.post("http://localhost:8080/checkout", { 
        contactInfo: form,
        items: cart.map((item) => item.id),
        user_id: user.id,
        username: user.username,
        email: user.email
        });
        setCart([]);
        setConfirmation(orders.id);
        navigate("/profile/user_id");
    };
    

    return(
        <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="cimsor">Vásárlás</h1>
                        <Form onSubmit={checkOut}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="textTwo">Vezetéknév</Form.Label>
                                    <Form.Control 
                                            onChange={updateFormValue("firstname", form, setForm)}
                                            value={form.firstname} 
                                            placeholder="Vezetéknév" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">Keresztnév</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("lastname", form, setForm)}
                                            value={form.lastname} 
                                            placeholder="Keresztnév" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">Lakcím</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("address", form, setForm)}
                                            value={form.address} 
                                            placeholder="Lakcím" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">Kártya szám</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("cardNumber", form, setForm)}
                                            value={form.cardNumber} 
                                            placeholder="Kártya szám" />
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Rendelés elküldése
                                </Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
            </Container>
    )
}