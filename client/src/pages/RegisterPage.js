import { useState, useContext } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from '../App';
import { useNavigate  } from "react-router-dom";


const DEFAULT_FORM_OBJECT = {
        username:'',
        password:'',
        email:''
    };

export function RegisterPage(){


    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();


    const updateFormValue = (key) => (e) => {
        if(e.username === ""){
            setError("Felh rossz")
        }
        setForm({
            ...form,
            [key]: e.currentTarget.value,
        });
    };


    const registerUser =  async (e, values) => {
        e.preventDefault();
        
        await Axios.post("http://localhost:8080/register", form);
        const response = await Axios.post("http://localhost:8080/login", form);
        const {token, user} = response.data;
        console.log("token", token);
        
        setUser({
            token,
            user,
        });

        navigate("/");
    };

    return(
        
        <div className="product">
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="cimsor">Regisztráció</h1>
                        <Form onSubmit={registerUser}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="textTwo">Felhasználónév</Form.Label>
                                    <Form.Control 
                                            onChange={updateFormValue("username")}
                                            value={form.username} 
                                            type="text" 
                                            placeholder="A kívánt felhasználónév megadása"
                                            />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label className="textTwo">Email</Form.Label>
                                    <Form.Control 
                                            onChange={updateFormValue("email")}
                                            value={form.email} 
                                            type="text" placeholder="A kívánt Email megadása" />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">Jelszó</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("password")}
                                            value={form.password} 
                                            type="password" 
                                            placeholder="A kívánt jelszó megadása" />
                                </Form.Group>
                                
                                <Button variant="success" type="submit">
                                    Regisztráció
                                </Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
        
    );
};