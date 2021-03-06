import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    ToastContainer,
    Toast,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShoppingCartContext, UserContext } from "../App";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import "../style/ProductsPage.css";
import "../style/Toast.css";

export function ProductsPage() {
    //hooks and contextes
    const [products, setProducts] = useState([]);
    const NUMBER_OF_COLUMNS = 12;
    const [cart, setCart] = useContext(ShoppingCartContext);
    const [search, setSearch] = useState("");
    const [showToast, setShowToast] = useState(false);
    const isLoggedIn = useIsLoggedIn();
    const { user } = useContext(UserContext);

    //will getting all the products
    useEffect(() => {
        const fetchProducts = async () => {
            const { data: prods } = await axios.get(
                "http://localhost:8080/products"
            );
            setProducts(prods);
        };
        fetchProducts();
    }, []);

    const getProductsInColumn = (products, numberOfColumns, columns) => {
        return products.filter(
            (col, index) => index % numberOfColumns === columns
        );
    };

    //to add a product to the cart
    const addProductToCart = (product) => {
        setCart([...cart, { ...product }]);
        setShowToast(true);
    };

    //to search the searchbar
    const onSearchChange = (e) => {
        setSearch(e.currentTarget.value);
    };

    //to set the searchbar for only working to the product's name
    const getFilteredProducts = (products) => {
        return products.filter((product) => product.name.includes(search));
    };

    //setting up the product card
    const ProductCard = ({
        isAdmin,
        isLoggedIn,
        product,
        addProductToCart,
    }) => {
        return (
            <Card className="homeCards" key={product.id}>
                <Card.Img
                    className="cardImg"
                    src={`http://localhost:8080/${product.image}`}
                />
                <Card.Body>
                    <Card.Title className="title">{product.name}</Card.Title>
                    {!isAdmin && (
                        <Card.Text className="cost">
                            {product.cost} HUF
                        </Card.Text>
                    )}
                    {!isAdmin && isLoggedIn && (
                        <Button
                            className="toCartBtn"
                            onClick={() => addProductToCart(product)}
                        >
                            Kos??rba
                        </Button>
                    )}
                    {!isAdmin && (
                        <Link
                            className="descriptionLink"
                            to={`/products/product/${product.id}`}
                        >
                            Le??r??s
                        </Link>
                    )}
                    {isAdmin && (
                        <Link
                            className="editLink"
                            to={`/products/product/${product.id}`}
                        >
                            V??lem??nyek kezel??se<br></br>
                        </Link>
                    )}
                    {isAdmin && (
                        <Link
                            className="editLink"
                            to={`/products/${product.id}`}
                        >
                            Term??k Szerkeszt??s
                        </Link>
                    )}
                </Card.Body>
            </Card>
        );
    };

    return (
        //will send a message if the product added to the cart
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
                            Sikeresen beker??lt a kos??rba
                        </strong>
                    </Toast.Header>
                    <Toast.Body>Term??k hozz??adva</Toast.Body>
                </Toast>
            </ToastContainer>

            <Container>
                <Row>
                    <Col>
                        <Form.Control
                            className="input"
                            size="lg"
                            type="text"
                            value={search}
                            placeholder="Term??k keres??se"
                            onChange={onSearchChange}
                        />
                    </Col>
                </Row>
                <Row>
                    {new Array(NUMBER_OF_COLUMNS)
                        .fill("")
                        .map((value, column) => (
                            <Col>
                                {getProductsInColumn(
                                    getFilteredProducts(products),
                                    NUMBER_OF_COLUMNS,
                                    column
                                ).map((product) => (
                                    <ProductCard
                                        isLoggedIn={isLoggedIn}
                                        isAdmin={user?.role === "admin"}
                                        key={product.id}
                                        product={product}
                                        addProductToCart={addProductToCart}
                                    />
                                ))}
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    );
}
