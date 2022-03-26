import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { updateFormValue } from "./CreateProductPage";
import "../style/EditUser.css"

const DEFAULT_FORM_OBJECT = {
        username:'',
        password: '',
        role:''
    };
    
export function EditUser(){
    
    
    
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const {user} = useContext(UserContext);
    const { id: userID } = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        const getUser = async () => {
            const { data: form } = await Axios.get(`http://localhost:8080/users/${userID}`);
            setForm({
                username: form[0].username,
                password: form[0].password,
                role: form[0].role,
            });
        };   
        getUser();
    }, [])

    /*const updateFormValue = (key, e) => {
        console.log(key)
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };*/

    const updateUser = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("role", form.role);
        await Axios.put(`http://localhost:8080/users/${userID}`, formData, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        });
        setForm(DEFAULT_FORM_OBJECT);
        navigate("/users");
    };

    const deleteUser = () => {
            Axios.delete(`http://localhost:8080/deleteUser/${userID}`, {
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        });
        navigate("/users")
    }


    return(
        
        <div className="users">
            
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="headLine">Felhasználó szerkesztése</h1>
                    
                        <Form onSubmit={updateUser}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Felhasználónév</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormValue("username", form, setForm)}
                                            value={form.username} 
                                            type="text" placeholder="Uj felhasználónév" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label>Jelszó</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("password", form, setForm)}
                                            value={form.password} 
                                            type="password" 
                                            placeholder="Uj jelszo" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                        <Form.Label>Jogosúltság</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("role", form, setForm)}
                                            value={form.role} 
                                            type="text" 
                                            placeholder="Uj role" />
                                </Form.Group>
                                <Button className="submitBtn" type="submit">
                                   Mentés
                                </Button><br /><br />
                                <Button className="deleteBtn" onClick={deleteUser}>Törlés</Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
        
    );
};