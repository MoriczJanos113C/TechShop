import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import "../style/EditProduct.css";

const DEFAULT_FORM_OBJECT = {
    name: "",
    cost: 0,
    category: "",
    description: "",
};

export function EditProduct() {
    //hooks, contextes, navigate and id for the product
    const { user } = useContext(UserContext);
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const [nameError, setNameError] = useState("");
    const [costError, setCostError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [categoryError, setCategoryError] = useState("");

    //getting all the entries with the entry's datas too what will be in the inputs
    useEffect(() => {
        const getProduct = async () => {
            const { data: product } = await Axios.get(
                `http://localhost:8080/products/product/${productId}`
            );
            setForm({
                name: product[0].name,
                cost: product[0].cost,
                category: product[0].category,
                description: product[0].description,
                file: product[0].image,
            });
        };

        getProduct();
    }, []);

    //wil update the datas after the form is sent
    const updateProduct = async (e) => {
        e.preventDefault();
        if (
            nameError === "" &&
            categoryError === "" &&
            descriptionError === "" &&
            costError === "" &&
            form.name.trim() != "" &&
            form.category.trim() != "" &&
            form.description.trim() != ""
        ) {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("cost", form.cost);
            formData.append("category", form.category);
            formData.append("description", form.description);
            formData.append("file", form.file);

            await Axios.put(
                `http://localhost:8080/products/${productId}`,
                formData,
                {
                    headers: {
                        "content-type": "multipart/form-data",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            setForm(DEFAULT_FORM_OBJECT);
            navigate("/products");
        }
    };

    //will delete a product after the button is clicked
    const deleteProduct = () => {
        Axios.delete(`http://localhost:8080/deleteProduct/${productId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        navigate("/products");
    };

    //to write to form
    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

    //to the file
    const updateFormFileValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.files[0],
        });
    };

    //validation for the form
    const checkValid = () => {
        if (
            !String(form.name).match(
                /^[a-zA-z\u00C0-\u024F0-9 $()_+\-=\[\]{};':"\\|,.<>\/?!]{4,}$/
            ) &&
            form.name.trim() != ""
        )
            setNameError("Nem megfelel?? term??k n??v");
        else {
            setNameError("");
        }

        if (
            !String(form.category).match(
                /^[a-zA-z\u00C0-\u024F $()_+\-=\[\]{};':"\\|,.<>\/?!]{4,}$/
            ) &&
            form.category.trim() != ""
        )
            setCategoryError("Nem megfelel?? term??k kateg??ria");
        else {
            setCategoryError("");
        }

        if (!String(form.cost).match(/^[0-9]{1,}$/) && form.cost.trim() != "")
            setCostError("Nem megfelel?? ??r");
        else {
            setCostError("");
        }

        if (
            !String(form.description).match(
                /^[a-zA-Z\u00C0-\u024F0-9 $()_+\-=\[\]{};':"\\|,.<>\/?!\n]/
            ) &&
            form.description.trim() != ""
        )
            setDescriptionError("Nem megfelel?? le??r??s");
        else {
            setDescriptionError("");
        }
    };

    //check that the validation is correct
    useEffect(() => {
        checkValid();
    }, [form]);

    return (
        <div className="product">
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <h1 className="headLine">Term??k szerkeszt??se</h1>

                    <Form onSubmit={updateProduct}>
                        <Form.Group className="mb-3">
                            <Form.Label>N??v</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("name")}
                                value={form.name}
                                type="name"
                                placeholder="ide ??rd a term??k nev??t"
                            />
                        </Form.Group>
                        {nameError && <p>{nameError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Kateg??ria</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("category")}
                                value={form.category}
                                type="text"
                                placeholder="ide ??rd a term??k kateg??ri??j??t"
                            />
                        </Form.Group>
                        {categoryError && <p>{categoryError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>??r</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("cost")}
                                value={form.cost}
                                type="number"
                                placeholder="Ide ??rd a term??k ??r??t"
                            />
                        </Form.Group>
                        {costError && <p>{costError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Term??k le??r??sa</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("description")}
                                value={form.description}
                                type="text"
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                        {descriptionError && <p>{descriptionError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>K??p</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormFileValue("file")}
                                value={form.image}
                                name="image"
                                type="file"
                            />
                        </Form.Group>
                        <Button className="submitBtn" type="submit">
                            Ment??s
                        </Button>
                        <br />
                        <br />
                        <Button className="deleteBtn" onClick={deleteProduct}>
                            T??rl??s
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}
