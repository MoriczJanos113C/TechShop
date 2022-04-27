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
    
    
export function LoginPage({submit}){

    
    //hooks and contextes
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("");

    //to write to form
    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });

    };

    
    //will post the datas from the form after the form is sent
    //its logging in the user if the user having correct datas for his/her account(username, password)
    //and if he/she not having the correct datas will send a message that the user is having bad datas like "Bad password or username"
    const loginUser =  async (e) => {
        e.preventDefault();
        const response = await Axios.post("http://localhost:8080/login", form);
        const {token, user} = response.data;
        setUser({
            token,
            user,
        });
        if(response.data.message){
            setLoginStatus(response.data.message)
        } else{
            setLoginStatus(response.data[0])
            navigate("/products")
        }

          
    };

    //its navigating the user to the frontpage with a button without logging in
    const navigateToProducts = () => {
        navigate("/products")
    }

    return(
        
        <div className="logIn">
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="headLine">Bejelentkezés</h1>
                        <Form onSubmit={loginUser}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="username">Felhasználónév</Form.Label>
                                    <Form.Control className="input"
                                            id="username"
                                            onChange={updateFormValue("username")}
                                            value={form.username} 
                                            type="text" placeholder="Felhasználónév" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                        <Form.Label htmlFor="password">Jelszó</Form.Label>
                                        <Form.Control className="input"
                                            id="password"
                                            onChange={updateFormValue("password")}
                                            value={form.password} 
                                            type="password" 
                                            placeholder="Jelszó" />
                                </Form.Group>
                                <Button className="btn" data-testid="login" type="submit">
                                    Bejelentkezés
                                </Button>
                                {loginStatus && <p>{loginStatus}</p>}
                                <Button onClick={navigateToProducts} className="btn" type="submit">
                                    Folytatás bejelentkezés nélkül
                                </Button>
                                
                            </Form>

                        </Col>
                    <Col></Col>
                </Row>
        </div>
        
    );
};

export default LoginPage;