import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { updateFormFileValue, updateFormValue } from "./CreateProductPage";

const DEFAULT_FORM_OBJECT = {
        name:'',
        cost: 0,
        description:''
    };
    
export function EditProduct(){
    
    
    
    
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
                description: product.description,
                image: product.image,
            });
        };   
        getProduct();
    }, [])



    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("cost", form.cost);
        formData.append("description", form.description);
        formData.append("file", form.file);
        await Axios.put(`http://localhost:8080/products/${productId}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`,
            }
        });
        setForm(DEFAULT_FORM_OBJECT);
        navigate("/");
    };

    const deleteProduct = () => {
            Axios.delete(`http://localhost:8080/deleteProduct/${productId}`, {
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
                                            onChange={updateFormValue("name", form, setForm)}
                                            value={form.name} 
                                            type="name" placeholder="ide írd a termék nevét" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">Ár</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("cost", form, setForm)}
                                            value={form.cost} 
                                            type="number" 
                                            placeholder="Ide írd a termék árát" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="textTwo">Termék leírása</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("description", form, setForm)}
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