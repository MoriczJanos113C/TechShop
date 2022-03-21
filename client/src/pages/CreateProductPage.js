import { useContext, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../style/CreateProductPage.css"



export const updateFormFileValue = (key, form, setForm) => (e) => {
    setForm({
        ...form,
        [key]: e.target.files[0],
    });
};

export const updateFormValue = (key, form, setForm) => (e) => {
    console.log(key,form,e.target.value)
    setForm({
        ...form,
        [key]: e.target.value,
    });
};

const DEFAULT_FORM_OBJECT = {
        name:'',
        cost: 0,
        description:''
    };

export function CreateProductPage(){

    

    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    


    const createProduct =  async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("cost", form.cost);
        formData.append("description", form.description);
        formData.append("file", form.file);
        await Axios.post("http://localhost:8080/products", formData, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`,
            }
        });
        navigate("/");
        setForm(DEFAULT_FORM_OBJECT);
    };

    return(
        
        <div className="product">
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="headLine">Új termék hozzáadása</h1>
                        <Form onSubmit={createProduct}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Név</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormValue("name", form, setForm)}
                                            value={form.name} 
                                            type="name" placeholder="ide írd a termék nevét" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label>Ár</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("cost", form, setForm)}
                                            value={form.cost}
                                            type="number" 
                                            placeholder="Ide írd a termék árát" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Termék leírása</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("description", form, setForm)}
                                            value={form.description} 
                                            type="text" as="textarea" 
                                            rows={3}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kép</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormFileValue("file", form, setForm)}
                                            type="file" placeholder="Ide írd a termék nevét" />
                                </Form.Group>
                                <Button className="btn" type="submit">
                                    Új termék felvétele
                                </Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
        </div>
        
    );
};