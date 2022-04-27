import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ConfirmationContext, ShoppingCartContext, UserContext } from "../App";
import "../style/CheckOutPage.css";

const DEFAULT_FORM_OBJECT = {
    address: "",
    firstname: "",
    lastname: "",
    cardNumber: "",
};

export function CheckOutPage() {
    //hooks and contextes, navigate
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const [cart, setCart] = useContext(ShoppingCartContext);
    const navigate = useNavigate();
    const [confirmation, setConfirmation] = useContext(ConfirmationContext);
    const { user } = useContext(UserContext);
    const [addressError, setAddressError] = useState("");
    const [firstnameError, setFirstnameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [cardNumberError, setCardnumberError] = useState("");

    //to write to form
    const updateFormValue = (key) => (e) => {
        setForm({
            ...form,
            [key]: e.target.value,
        });
    };

    //validation for the form
    const checkValid = () => {
        if (
            !String(form.address).match(
                /^[a-zA-z\u00C0-\u024F0-9 $()_+\-=\[\]{};':"\\|,.<>\/?!]{4,}$/
            ) &&
            form.address.trim() != ""
        )
            setAddressError("Nem megfelelő lakcím");
        else {
            setAddressError("");
        }

        if (
            !String(form.firstname).match(/^[a-zA-z\u00C0-\u024F0-9]{4,}$/) &&
            form.firstname.trim() != ""
        )
            setFirstnameError("Nem megfelelő vezetéknév");
        else {
            setFirstnameError("");
        }

        if (
            !String(form.lastname).match(/^[a-zA-Z\u00C0-\u024F]{3,}$/) &&
            form.lastname.trim() != ""
        )
            setLastnameError("Nem megfelelő keresztnév");
        else {
            setLastnameError("");
        }

        if (
            !String(form.cardNumber).match(/^[a-zA-Z0-9 -]{16,16}$/) &&
            form.cardNumber.trim() != ""
        )
            setCardnumberError("Nem megfelelő bankszámlaszám");
        else {
            setCardnumberError("");
        }
    };

    //check that the validation is correct
    useEffect(() => {
        checkValid();
    }, [form]);

    //will post the datas from the form, after the form is sent
    const checkOut = async (e) => {
        e.preventDefault();
        if (
            firstnameError === "" &&
            lastnameError === "" &&
            addressError === "" &&
            cardNumberError === "" &&
            form.firstname.trim() != "" &&
            form.lastname.trim() != "" &&
            form.address.trim() != "" &&
            form.cardNumber.trim() != ""
        ) {
            const { data: orders } = await axios.post(
                "http://localhost:8080/checkout",
                {
                    contactInfo: form,
                    items: cart.map((item) => item.id),
                    itemName: cart.map((item) => item.name),
                    user_id: user.id,
                    username: user.username,
                    email: user.email,
                    totalCost: cart.reduce(
                        (sum, product) => sum + product.cost,
                        0
                    ),
                }
            );
            setCart([]);
            setConfirmation(orders.id);

            navigate(`/profile/${user.id}`);
        }
    };

    //if the user not having any products in his/her cart will navigate him/her to the products page
    useEffect(() => {
        if (cart.length === 0) {
            navigate("/products");
        }
    });

    return (
        <div className="main">
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <h1 className="headLine">Vásárlás</h1>
                    <Form onSubmit={checkOut}>
                        <Form.Group className="mb-3">
                            <Form.Label>Vezetéknév</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("firstname")}
                                value={form.firstname}
                                type="text"
                                placeholder="Vezetéknév"
                            />
                        </Form.Group>
                        {firstnameError && <p>{firstnameError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Keresztnév</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("lastname")}
                                value={form.lastname}
                                type="text"
                                placeholder="Keresztnév"
                            />
                        </Form.Group>
                        {lastnameError && <p>{lastnameError}</p>}

                        <Form.Group className="mb-3">
                            <Form.Label>Lakcím</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("address")}
                                value={form.address}
                                type="text"
                                placeholder="Lakcím"
                            />
                        </Form.Group>
                        {addressError && <p>{addressError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Bankkártya szám</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("cardNumber")}
                                value={form.cardNumber}
                                type="text"
                                placeholder="Bankkártya szám"
                            />
                        </Form.Group>
                        {cardNumberError && <p>{cardNumberError}</p>}
                        <Button className="btn" type="submit">
                            Rendelés elküldése
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}
