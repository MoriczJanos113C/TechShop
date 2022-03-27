import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, ToastContainer, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShoppingCartContext, UserContext } from '../App';
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import "../style/ProductsPage.css"
import "../style/Toast.css"

export function ProductsPage(){

    const [products, setProducts] = useState([]);
    const NUMBER_OF_COLUMNS = 4;
    const [cart, setCart] = useContext(ShoppingCartContext);
    const [search, setSearch] = useState("");
    const [showToast, setShowToast] = useState(false);
    const isLoggedIn = useIsLoggedIn();
    const {user} = useContext(UserContext);
    const isAdmin = useIsAdmin();

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
            <Card className="homeCards" key={product.id} >
                <Card.Img className="cardImg" src={`http://localhost:8080/${product.image}`} />
                <Card.Body>
                    <Card.Title className="title">{product.name}</Card.Title>
                    <Card.Text className="cost">
                        {product.cost} HUF
                    </Card.Text>
                    {!isAdmin && isLoggedIn && (
                        <Button className="toCartBtn" onClick={() => addProductToCart(product)}>Kosárba</Button>
                    )} 
                    {!isAdmin && (
                        <Link className="descriptionLink" to={`/products/product/${product.id}`}>Leírás</Link>   
                    )}         
                    {isAdmin && (
                        <Link className="editLink" to={`/products/product/${product.id}`}>Vélemények szerkesztése<br></br></Link>
                    )}
                    {isAdmin && (
                        <Link className="editLink" to={`/products/${product.id}`}>Termék Szerkesztés</Link>
                    )}
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
                    <Form.Control className="input"
                        size="lg" 
                        type="text" 
                        value={search}
                        placeholder="Termék keresése" 
                        onChange={onSearchChange}
                        />
                    {isAdmin && (
                    <Link className="createLink" to="/create-product">Termék létrehozása</Link>
                    )}
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
