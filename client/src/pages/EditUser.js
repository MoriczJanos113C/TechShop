import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import "../style/EditUser.css";

const DEFAULT_FORM_OBJECT = {
    username: "",
    password: "",
    role: "",
    email: "",
};

export function EditUser() {
    //hooks, contextes, navigate and id for a user
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const { user } = useContext(UserContext);
    const { id: userID } = useParams();
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [emailError, setEmailError] = useState("");

    //to write to form
    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

    //to get all the users with the user's datas what will be in the input
    useEffect(() => {
        const getUser = async () => {
            const { data: form } = await Axios.get(
                `http://localhost:8080/users/${userID}`
            );
            setForm({
                username: form[0].username,
                password: form[0].password,
                role: form[0].role,
                email: form[0].email,
            });
        };
        getUser();
    }, []);

    //validation for the form
    const checkValid = () => {
        if (
            !String(form.username).match(/^[a-zA-z0-9]{3,}$/) &&
            form.username.trim() != ""
        )
            setUsernameError("Nem megfelelő felhasználónév");
        else {
            setUsernameError("");
        }

        if (
            !String(form.password).match(
                /^[a-zA-Z0-9$()_+\-=\[\]{};':"\\|,.<>\/?!]{6,}$/
            ) &&
            form.password.trim() != ""
        )
            setPasswordError("Nem megfelelő jelszó");
        else {
            setPasswordError("");
        }

        if (
            !String(form.role).match(/^[a-zA-Z0-9]{0,}$/) &&
            form.role.trim() != ""
        )
            setRoleError("Nem megfelelő jogosultsági rang");
        else {
            setRoleError("");
        }

        if (
            !String(form.email).match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) &&
            form.email.trim() != ""
        )
            setEmailError("Nem megfelelő email");
        else {
            setEmailError("");
        }
    };
    //check that the validation is correct
    useEffect(() => {
        checkValid();
    }, [form]);

    //will update the datas after the form is sent
    const updateUser = async (e) => {
        e.preventDefault();
        if (
            usernameError === "" &&
            passwordError === "" &&
            roleError === "" &&
            emailError === "" &&
            form.username.trim() != "" &&
            form.password.trim() != "" &&
            form.role.trim() != "" &&
            form.email.trim() != ""
        ) {
            await Axios.put(`http://localhost:8080/users/${userID}`, form, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setForm(DEFAULT_FORM_OBJECT);
            navigate("/users");
        }
    };

    //will delete a user after the button is clicked
    const deleteUser = () => {
        Axios.delete(`http://localhost:8080/deleteUser/${userID}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        navigate("/users");
    };

    return (
        <div className="users">
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <h1 className="headLine">
                        {form.username} felhasználó szerkesztése
                    </h1>

                    <Form onSubmit={updateUser}>
                        <Form.Group className="mb-3">
                            <Form.Label>Felhasználónév</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("username")}
                                value={form.username}
                                type="text"
                                placeholder="Uj felhasználónév"
                            />
                        </Form.Group>
                        {usernameError && <p>{usernameError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Jelszó</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("password")}
                                value={form.password}
                                type="password"
                                placeholder="Uj jelszo"
                            />
                        </Form.Group>
                        {passwordError && <p>{passwordError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("email")}
                                value={form.email}
                                type="text"
                                placeholder="A kívánt email megadása"
                            />
                        </Form.Group>
                        {emailError && <p>{emailError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Jogosúltság</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("role")}
                                value={form.role}
                                type="text"
                                placeholder="Uj role"
                            />
                        </Form.Group>
                        {roleError && <p>{roleError}</p>}
                        <Button className="submitBtn" type="submit">
                            Mentés
                        </Button>
                        <br />
                        <br />
                        <Button className="deleteBtn" onClick={deleteUser}>
                            Törlés
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}
