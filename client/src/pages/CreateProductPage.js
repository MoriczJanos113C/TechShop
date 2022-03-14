import { useContext, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export function CreateProductPage(){

    const DEFAULT_FORM_OBJECT = {
        name:'',
        cost: 0,
        description:''
    };

    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.currentTarget.value,
        });
    };

    const createProduct =  async (e) => {
        e.preventDefault();
        await Axios.post("http://localhost:8080/products", form, {
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        });
        navigate("/");
        setForm(DEFAULT_FORM_OBJECT);
    };

    return(
        
        <div className="product">
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="cimsor">Új termék hozzáadása</h1>
                        <Form onSubmit={createProduct}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="textTwo">Név</Form.Label>
                                    <Form.Control 
                                            onChange={updateFormValue("name")}
                                            value={form.name} 
                                            type="name" placeholder="ide írd a termék nevét" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">Ár</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("cost")}
                                            value={form.cost} 
                                            type="number" 
                                            placeholder="Ide írd a termék árát" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="textTwo">Termék leírása</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("description")}
                                            value={form.description} 
                                            type="text" as="textarea" 
                                            rows={3}/>
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Új termék felvétele
                                </Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
        
    );
};