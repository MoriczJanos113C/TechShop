import { useState, useContext } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from '../App';
import { useNavigate  } from "react-router-dom";
import "../style/RegisterPage.css"
import { updateFormValue } from "./CreateProductPage";


const DEFAULT_FORM_OBJECT = {
        username:'',
        password:'',
        email:''
    };



export function RegisterPage(){


    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [usernameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");



//FORM VALIDATION
//react hook form.com
//js form validator regexes
//email/password regex validator

    const checkValid = () => {

            
        if(!String(form.password)
        .match(
            /^[a-zA-Z0-9]{6,}$/
        ))
        setPasswordError("Nem megfelelő jelszó")

        if(!String(form.username)
        .match(
            /^[a-zA-Z0-9]{3,}$/
        ))
        setNameError("Nem megfelelő felhasználónév")

        if(!String(form.email)
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ))
        setEmailError("Nem megfelelő email")
        
        
    }

    const registerUser =  async (e, values) => {
        e.preventDefault();
        checkValid();
        if(usernameError === "" && passwordError === "" && emailError === ""){
            console.log(usernameError, passwordError, emailError)
        await Axios.post("http://localhost:8080/register", form);
        const response = await Axios.post("http://localhost:8080/login", form);
        const {token, user} = response.data;
        console.log("token", token);
        
        setUser({
            token,
            user,
        });
    
        navigate("/");
        }
    };

    return(
        
        <div className="register">
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="headLine">Regisztráció</h1>
                        <Form onSubmit={registerUser}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Felhasználónév</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormValue("username", form, setForm)}
                                            value={form.username} 
                                            type="text" 
                                            placeholder="A kívánt felhasználónév megadása"
                                            />
                                </Form.Group>

                                {usernameError && <p>{usernameError}</p>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormValue("email", form, setForm)}
                                            value={form.email} 
                                            type="text" placeholder="A kívánt email megadása" />
                                </Form.Group>

                                {emailError && <p>{emailError}</p>}
                                <Form.Group className="mb-3">
                                        <Form.Label>Jelszó</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("password", form, setForm)}
                                            value={form.password} 
                                            type="password" 
                                            placeholder="A kívánt jelszó megadása" />
                                </Form.Group>

                                {passwordError && <p>{passwordError}</p>}
                                <Button className="btn" type="submit">
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