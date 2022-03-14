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
    const {user} = useContext(UserContext);
    const { id: productId } = useParams();
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

    

    const updateProduct = (e) => {
        e.preventDefault();
            Axios.put(`http://localhost:8080/products/${productId}`, form, {
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        });
        
        navigate("/");
        setForm(DEFAULT_FORM_OBJECT);
    };

    const deleteProduct = () => {
            Axios.delete(`http://localhost:8080/deleteProduct/${productId}`, form, {
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        });
        navigate("/")
    }
    return(
        
        <div className="product">
            
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="cimsor">Termék szerkesztése</h1>
                    
                        <Form onSubmit={updateProduct}>
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
                                   Mentés
                                </Button><br /><br />
                                <Button onClick={deleteProduct} variant="danger">Törlés</Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
        
    );
};