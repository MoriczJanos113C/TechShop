import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

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
            await Axios.get(`http://localhost:8080/users/${userID}`);
            setForm({
                username: form.username,
                password: form.password,
                role: form.role,
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
        navigate("/");
    };

    const deleteUser = () => {
            Axios.delete(`http://localhost:8080/deleteUsers/${userID}`, {
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
                    <h1 className="cimsor">Felhasználó szerkesztése</h1>
                    
                        <Form onSubmit={updateUser}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="textTwo">Un</Form.Label>
                                    <Form.Control 
                                            onChange={(e) => updateFormValue("username", e)}
                                            value={form.username} 
                                            type="text" placeholder="" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">P</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("password")}
                                            value={form.password} 
                                            type="text" 
                                            placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">Role</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("role")}
                                            value={form.role} 
                                            type="text" 
                                            placeholder="" />
                                </Form.Group>
                                <Button variant="success" type="submit">
                                   Mentés
                                </Button><br /><br />
                                <Button onClick={deleteUser} variant="danger">Törlés</Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
        
    );
};