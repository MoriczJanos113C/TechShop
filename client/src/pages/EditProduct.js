import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

export function EditProduct(){
    
    
    const DEFAULT_FORM_OBJECT = {
        name:'',
        cost: 0,
        description:''
    };
    
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const [user] = useContext(UserContext);
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        const getProduct = async () => {
            const { data: product } = await Axios.get(`http://localhost:8080/products/${productId}`);
            setForm({
                name: product.name, 
                cost: product.cost, 
                description: product.description
            });
        };   
        getProduct();
    }, [])

    

    
    
    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.currentTarget.value,
        });
    };

    

    const updateProduct =  async (e) => {
        e.preventDefault();
        await Axios.put(`http://localhost:8080/products/${productId}`, form, {
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
                    <h1>Termék szerkesztése</h1>
                        <Form onSubmit={updateProduct}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Név</Form.Label>
                                    <Form.Control 
                                            onChange={updateFormValue("name")}
                                            value={form.name} 
                                            type="name" placeholder="ide írd a termék nevét" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label>Ár</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("cost")}
                                            value={form.cost} 
                                            type="number" 
                                            placeholder="Ide írd a termék árát" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Termék leírása</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("description")}
                                            value={form.description} 
                                            type="text" as="textarea" 
                                            rows={3}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                   Mentés
                                </Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
        
    );
};