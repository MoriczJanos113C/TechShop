import { useState, useContext } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from '../App';
import { useNavigate  } from "react-router-dom";
import "../style/LoginPage.css"

const DEFAULT_FORM_OBJECT = {
        username:'',
        password:''
    };
    
export function LoginPage(){

    

    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const { setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const updateFormValue = (key) => (e) => {
        
        setForm({
            ...form,
            [key]: e.target.value,
        });
        console.log(key,form,e.target.value)
    };

    const loginUser =  async (e) => {
        e.preventDefault();
        const response = await Axios.post("http://localhost:8080/login", form);
        const {token, user} = response.data;
        console.log(response.data);
        setUser({
            token,
            user,
        });
        navigate("/");
    };

    return(
        
        <div className="logIn">
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="headLine">Bejelentkezés</h1>
                        <Form onSubmit={loginUser}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Felhasználónév</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormValue("username")}
                                            value={form.username} 
                                            type="text" placeholder="Felhasználónév" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label>Jelszó</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("password")}
                                            value={form.password} 
                                            type="password" 
                                            placeholder="Jelszó" />
                                </Form.Group>
                                <Button className="btn" type="submit">
                                    Bejelentkezés
                                </Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
        </div>
        
    );
};