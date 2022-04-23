import { useState, useContext, useEffect } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from '../App';
import { useNavigate } from "react-router-dom";
import "../style/RegisterPage.css"

const DEFAULT_FORM_OBJECT = {
    username: '',
    password: '',
    email: ''
};



export function RegisterPage() {


    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [usernameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    
    const updateFormValue = (key) => (e) => {

        setForm({
            ...form,
            [key]: e.target.value,
        });
        console.log(key, form, e.target.value)
    };

    useEffect(() => {
        checkValid();
    }, [form])

    const checkValid = () => {


        if (!String(form.password)
            .match(
                /^[a-zA-Z0-9]{6,}$/
            ) && form.password.trim() != "")
            setPasswordError("Nem megfelelő jelszó")
        else {
            setPasswordError("");
        }

        if (!String(form.username)
            .match(
                /^[a-zA-Z0-9]{3,}$/
            ) && form.username.trim() != "")
            setNameError("Nem megfelelő felhasználónév")
        else {
            setNameError("");
        }

        if (!String(form.email)
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) && form.email.trim() != "")
            setEmailError("Nem megfelelő email")
        else {
            setEmailError("");
        }


    }


    const registerUser = async (e) => {
        e.preventDefault();
        if (usernameError === "" && passwordError === "" && emailError === "" && form.email.trim() != "" && form.username.trim() != "" && form.password.trim() != "") {
            const rResponse = await Axios.post("http://localhost:8080/register", form);
            const response = await Axios.post("http://localhost:8080/login", form);
            const { token, user } = response.data
            setUser({
                token,
                user,
            });
            if (rResponse.data.message) {
                setLoginStatus(rResponse.data.message)
                
            }
            else {
                
                navigate("/products");
            }
            console.log(rResponse.data);

        }

    };

    return (

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
                                    onChange={updateFormValue("username")}
                                    value={form.username}
                                    type="text"
                                    placeholder="A kívánt felhasználónév megadása"
                                />
                            </Form.Group>

                            {usernameError && <p>{usernameError}</p>}
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className="input"
                                    onChange={updateFormValue("email")}
                                    value={form.email}
                                    type="text" placeholder="A kívánt email megadása" />
                            </Form.Group>

                            {emailError && <p>{emailError}</p>}
                            <Form.Group className="mb-3">
                                <Form.Label>Jelszó</Form.Label>
                                <Form.Control className="input"
                                    onChange={updateFormValue("password")}
                                    value={form.password}
                                    type="password"
                                    placeholder="A kívánt jelszó megadása" />
                            </Form.Group>

                            {passwordError && <p>{passwordError}</p>}
                            <Button className="btn" type="submit">
                                Regisztráció
                            </Button>
                            {loginStatus && <p>{loginStatus}</p>}
                            
                        </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>

    );
};