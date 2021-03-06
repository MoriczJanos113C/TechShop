import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
    Container,
    Row,
    Card,
    Button,
    Form,
    ToastContainer,
    Toast,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ShoppingCartContext, UserContext } from "../App";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import "../style/ProductPage.css";
import "../style/Toast.css";

const DEFAULT_FORM_OBJECT = {
    rating: "",
    description: "",
};
export function ProductPage() {
    //hooks and contextes and id for a product
    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewByProduct, setReviewByProduct] = useState([]);
    const { id: reviewID } = useParams();
    const [cart, setCart] = useContext(ShoppingCartContext);
    const [showToast, setShowToast] = useState(false);
    const { user } = useContext(UserContext);
    const { id: productID } = useParams();
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const isAdmin = useIsAdmin();
    const isLoggedIn = useIsLoggedIn();

    const [ratingError, setRatingError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

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
            !String(form.rating).match(/^[1-5]{1,1}$/) &&
            form.rating.trim() != ""
        )
            setRatingError("Nem megfelelő értékelés");
        else {
            setRatingError("");
        }

        if (
            !String(form.description).match(
                /^[a-zA-Z\u00C0-\u024F0-9 $()_+\-=\[\]{};':"\\|,.<>\/?!]{5,}$/
            ) &&
            form.description.trim() != ""
        )
            setDescriptionError("Nem megfelelő vélemény");
        else {
            setDescriptionError("");
        }
    };

    //check that the validation is correct
    useEffect(() => {
        checkValid();
    }, [form]);

    //getting one product
    useEffect(() => {
        const fetchProduct = async () => {
            const { data: prods } = await axios.get(
                `http://localhost:8080/products/product/${productID}`
            );
            setProduct(prods);
        };
        fetchProduct();
    }, [productID]);

    //getting the reviews what the product have by calling the review's id
    useEffect(() => {
        const fetchProduct = async () => {
            const { data: review } = await axios.get(
                `http://localhost:8080/productReviews/${reviewID}`
            );
            setReviewByProduct(review);
        };
        fetchProduct();
    }, [reviewID]);

    //to add a product to the cart
    const addProductToCart = (product) => {
        setCart([...cart, { ...product }]);
        setShowToast(true);
    };

    //to add a review for a product, and its sending the user's id, username too
    const addReview = async (e) => {
        e.preventDefault();
        if (
            ratingError === "" &&
            descriptionError === "" &&
            form.rating.trim() != "" &&
            form.description.trim() != ""
        ) {
            const { data: reviews } = await axios.post(
                "http://localhost:8080/review",
                {
                    product_id: productID,
                    user_id: user.id,
                    username: user.username,
                    description: form.description,
                    rating: form.rating,
                }
            );
            setReviews(reviews.id);
            window.location.reload();
        }
    };

    //will delete a review from a product if the button is clicked
    const deleteReview = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/deleteReview/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        window.location.reload();
    };

    //setting up the product card
    const Product = ({ isAdmin, isLoggedIn, product, addProductToCart }) => {
        return (
            <div className="cardContainer">
                <Card className="singleCard" key={product.id}>
                    <Card.Img
                        className="cardImg"
                        src={`http://localhost:8080/${product.image}`}
                    />
                    <Card.Body>
                        <Card.Title className="title">
                            {product.name}
                        </Card.Title>
                        <Card.Text className="description">
                            {product.description}
                        </Card.Text>
                        <Card.Text className="cost">
                            {product.cost} HUF
                        </Card.Text>
                        {!isAdmin && isLoggedIn && (
                            <Button
                                className="toCartBtn"
                                onClick={() => addProductToCart(product)}
                            >
                                Kosárba
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            </div>
        );
    };

    return (
        //toast container, what is showing a message after a product added to a cart
        <>
            <ToastContainer
                style={{ zIndex: "1" }}
                className="p-3 position-fixed"
                position={"top-center"}
            >
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={2000}
                    autohide
                >
                    <Toast.Header closeButton={false}>
                        <strong className="me-auto">
                            Sikeresen bekerült a kosárba
                        </strong>
                    </Toast.Header>
                    <Toast.Body>Termék hozzáadva</Toast.Body>
                </Toast>
            </ToastContainer>

            <Container className="review">
                <Row>
                    {product.map((p) => (
                        <Product
                            isLoggedIn={isLoggedIn}
                            isAdmin={user?.role === "admin"}
                            key={p.id}
                            product={p}
                            addProductToCart={addProductToCart}
                        />
                    ))}

                    {reviewByProduct.map((pR) => (
                        <div key={pR.id}>
                            {isAdmin && (
                                <Button
                                    onClick={(e) => deleteReview(e, pR.id)}
                                    className="deleteBtn"
                                >
                                    Törlés
                                </Button>
                            )}

                            <h1>{pR.username}</h1>
                            <h2>{pR.rating}</h2>
                            <p>{pR.description}</p>
                        </div>
                    ))}
                </Row>
            </Container>
            <Container>
                {!isAdmin && isLoggedIn && (
                    <Form onSubmit={addReview}>
                        <Form.Group className="mb-3">
                            <Form.Label>Értékelés</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("rating")}
                                value={form.rating}
                                placeholder="Értékelés pontszám szerint"
                            />
                        </Form.Group>
                        {ratingError && <p>{ratingError}</p>}
                        <Form.Group className="mb-3">
                            <Form.Label>Termék vélemény írás</Form.Label>
                            <Form.Control
                                className="input"
                                onChange={updateFormValue("description")}
                                value={form.description}
                                placeholder="Leírás"
                            />
                        </Form.Group>
                        {descriptionError && <p>{descriptionError}</p>}
                        <Button className="reviewBtn" type="submit">
                            Vélemény elküldése
                        </Button>
                    </Form>
                )}
            </Container>
        </>
    );
}
