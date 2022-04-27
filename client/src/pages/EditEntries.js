import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import "../style/EditProduct.css";

const DEFAULT_FORM_OBJECT = {
    title: "",
    description: "",
};

export function EditEntries() {
    //hooks and contextes, id for an entry, and navigate
    const { user } = useContext(UserContext);
    const { id: entriesID } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    //to write to form
    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

    //validation to the form
    const checkValid = () => {
        if (
            !String(form.title).match(
                /^[a-zA-Z\u00C0-\u024F0-9 $()_+\-=\[\]{};':"\\|,.<>\/?!\n]/
            ) &&
            form.title.trim() != ""
        )
            setTitleError("Nem megfelelő bejegyzés cím");
        else {
            setTitleError("");
        }

        if (
            !String(form.description).match(
                /^[a-zA-Z\u00C0-\u024F0-9 $()_+\-=\[\]{};':"\\|,.<>\/?!\n]/
            ) &&
            form.description.trim() != ""
        )
            setDescriptionError("Nem megfelelő bejegyzés leírás");
        else {
            setDescriptionError("");
        }
    };
    //check that the validation is correct
    useEffect(() => {
        checkValid();
    }, [form]);

    //getting all the entries with the entry's datas too what will be in the inputs
    useEffect(() => {
        const getEntries = async () => {
            const { data: ent } = await Axios.get(
                `http://localhost:8080/entries/${entriesID}`
            );
            setForm({
                title: ent[0].title,
                description: ent[0].description,
            });
        };
        getEntries();
    }, []);

    //wil update the datas after the form is sent
    const updateProduct = async (e) => {
        e.preventDefault();
        if (
            titleError === "" &&
            descriptionError === "" &&
            form.title.trim() != "" &&
            form.description.trim() != ""
        ) {
            await Axios.put(
                `http://localhost:8080/entries/${entriesID}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            setForm(DEFAULT_FORM_OBJECT);
            navigate("/entries");
        }
    };

    return (
        <div className="product">
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <h1 className="headLine">
                        {form.title} bejegyzés szerkesztése
                    </h1>

                    <Form onSubmit={updateProduct}>
                        <Form.Group className="mb-3">
                            <Form.Label>Bejegyzés címe</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("title")}
                                value={form.title}
                                type="text"
                                placeholder="ide írd a beejegyzés új címét"
                            />
                        </Form.Group>
                        {titleError && <p>{titleError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Bejegyzés leírása</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("description")}
                                value={form.description}
                                type="text"
                                as="textarea"
                                rows={10}
                            />
                        </Form.Group>
                        {descriptionError && <p>{descriptionError}</p>}
                        <Button className="submitBtn" type="submit">
                            Mentés
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}
