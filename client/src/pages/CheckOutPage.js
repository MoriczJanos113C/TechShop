import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ConfirmationContext, ShoppingCartContext, UserContext } from "../App";
import { updateFormValue } from "./CreateProductPage";
import "../style/CheckOutPage.css"

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
        itemName: cart.map((item) => item.name),
        user_id: user.id,
        username: user.username,
        email: user.email,
        totalCost: cart.reduce((sum, product) => sum+product.cost, 0)
        });
        setCart([]);
        setConfirmation(orders.id);
        navigate(`/profile/${user.id}`);
    };
    


    useEffect(() => {
        if(cart.length === 0){
            navigate("/")
        }
    })



    return(
        <div className="main">
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="headLine">Vásárlás</h1>
                        <Form onSubmit={checkOut}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Vezetéknév</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormValue("firstname", form, setForm)}
                                            value={form.firstname} 
                                            placeholder="Vezetéknév" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label>Keresztnév</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("lastname", form, setForm)}
                                            value={form.lastname} 
                                            placeholder="Keresztnév" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                        <Form.Label>Email cím</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("email", form, setForm)}
                                            value={form.email} 
                                            placeholder="Email cím" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                        <Form.Label>Lakcím</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("address", form, setForm)}
                                            value={form.address} 
                                            placeholder="Lakcím" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                        <Form.Label>Kártya szám</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("cardNumber", form, setForm)}
                                            value={form.cardNumber} 
                                            placeholder="Kártya szám" />
                                </Form.Group>
                                <Button className="btn" type="submit">
                                    Rendelés elküldése
                                </Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
            </div>
    )
}