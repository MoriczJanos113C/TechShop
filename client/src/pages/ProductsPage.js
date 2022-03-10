import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, ToastContainer, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShoppingCartContext, UserContext } from '../App';
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

export function ProductsPage(){

    const [products, setProducts] = useState([]);
    const NUMBER_OF_COLUMNS = 2;
    const [cart, setCart] = useContext(ShoppingCartContext);
    const [search, setSearch] = useState("");
    const [showToast, setShowToast] = useState(false);
    const isLoggedIn = useIsLoggedIn();
    const {user} = useContext(UserContext);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data: prods } = await axios.get("http://localhost:8080/products");
            setProducts(prods);
        };
        fetchProducts();
    }, []);

    const getProductsInColumn = (products, numberOfColumns, columns) => {
        return products.filter((col, index) => index % numberOfColumns === columns);
    };


    const addProductToCart = (product) => {
        setCart([...cart, {...product}]);
        setShowToast(true);
    };


    const onSearchChange = (e) => {
        setSearch(e.currentTarget.value);
    };

    const getFilteredProducts = (products) => {
        return products.filter((product) => product.name.includes(search))
    }

    const ProductCard = ({ isAdmin, isLoggedIn, product, addProductToCart }) => {
        return (
            <Card key={product.id} className="mb-4">
                <Card.Img style={{ width: '6rem' }} variant="top" src="./logo192.png" />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Card.Text>
                        {product.cost}HUF
                    </Card.Text>
                    {!isAdmin && isLoggedIn && (
                        <Button variant="primary" onClick={() => addProductToCart(product)}>Kosárba</Button>
                    )} 
                    {isAdmin && (
                        <Link to={`/products/${product.id}`}>Szerkesztés</Link>
                    )}          
                    <Link to={`/products/product/${product.id}`}>Leírás</Link>   
                </Card.Body>
            </Card>
        )
    }

    return(
        <>
        <ToastContainer 
        style={{"zIndex": "1"}}
        className="p-3 position-fixed" 
        position={"top-center"}>
          <Toast 
            onClose={() => setShowToast(false)} 
            show={showToast} 
            delay={2000} 
            autohide>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Sikeresen bekerült a kosárba</strong>
            </Toast.Header>
            <Toast.Body>Termék hozzáadva</Toast.Body>
          </Toast>
        </ToastContainer>
        <Container>
            <Row>
                <Col>
                    <Form.Control 
                        size="lg" 
                        type="text" 
                        value={search}
                        className="mb-4 mt-4"
                        placeholder="Termék keresése" 
                        onChange={onSearchChange}
                        />
                </Col>
            </Row>
            <Row>
                {new Array(NUMBER_OF_COLUMNS).fill('').map((value, column) => (
                    <Col>
                    {getProductsInColumn(
                        getFilteredProducts(products), 
                        NUMBER_OF_COLUMNS, 
                        column
                        ).map((product) => ( 
                    <ProductCard 
                    isLoggedIn={isLoggedIn}
                    isAdmin={user?.role==="admin"}
                    key={product.id}
                    product={product} 
                    addProductToCart={addProductToCart}/>
                        )
                    )}
                </Col>
            ))}   
            </Row>
        </Container>
        </>
    );
};
