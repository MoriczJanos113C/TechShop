import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { updateFormValue } from "./CreateProductPage";

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
            const { data: user } = await Axios.get(`http://localhost:8080/users/${userID}`);
            setForm({
                username: user.username,
                password: user.password,
                role: user.role
            });
        };   
        getUser();
    }, [])



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
        console.log(form.username);
        console.log(form.password);
        console.log(form.role);
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
        
        <div className="">
            
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="cimsor">Felhasználó szerkesztése</h1>
                    
                        <Form onSubmit={updateUser}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="textTwo">Felhasználó neve</Form.Label>
                                    <Form.Control 
                                            onChange={updateFormValue("username", form, setForm)}
                                            value={form.username} 
                                            type="text" placeholder="ide írd a felhasználó új nevét" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">Jelszó</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("password", form, setForm)}
                                            value={form.password} 
                                            type="password" 
                                            placeholder="Ide írd a felhasználó számára kívánt új jelszót" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label className="textTwo">Felhasználó jogosultsági rangja</Form.Label>
                                        <Form.Control 
                                            onChange={updateFormValue("role", form, setForm)}
                                            value={form.role} 
                                            type="text"/>
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