import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, ToastContainer, Toast } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ShoppingCartContext, UserContext } from '../App';
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

export function ProductPage(){

    const [product, setProduct] = useState([]);
    const NUMBER_OF_COLUMNS = 2;
    const [cart, setCart] = useContext(ShoppingCartContext);
    const [search, setSearch] = useState("");
    const [showToast, setShowToast] = useState(false);
    const isLoggedIn = useIsLoggedIn();
    const {user} = useContext(UserContext);
    const { id: productID } = useParams()
    useEffect(() => {
        const fetchProduct = async () => {
            const { data: prods } = await axios.get(`http://localhost:8080/products/product/${productID}`);
            setProduct(prods);
        };
        fetchProduct();
    }, []);

    const getProductInColumn = (products, numberOfColumns, columns) => {
        return products.filter((col, index) => index % numberOfColumns === columns);
    };


    const addProductToCart = (product) => {
        setCart([...cart, {...product}]);
        setShowToast(true);
    };

    const getFilteredProduct = (prod) => {
        return prod.filter((product) => product.name.includes(search))
    }


 //ide barmit tehetesz, diveket akár ki is cserelheted masra 44-61es sorig, ez jelenik meg majd amit az also returnba be injektálsz (91.sor)
    const Product = ({ isAdmin, isLoggedIn, product, addProductToCart }) => {
        return (
            <div key={product.id} className="mb-4">
                <Card.Img style={{ width: '6rem' }} variant="top" src="./logo192.png" />
                <div>
                    <section>{product.name}</section>
                    <section>
                        {product.cost}HUF
                    </section>
                    <footer>
                        {product.description}
                    </footer>
                    {!isAdmin && isLoggedIn && (
                        <Button variant="primary" onClick={() => addProductToCart(product)}>Kosárba</Button>
                    )} 
                    {isAdmin && (
                        <Link to={`/products/${product.id}`}>Szerkesztés</Link>
                    )}            
                </div>
            </div>
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
                {new Array(NUMBER_OF_COLUMNS).fill('').map((value, column) => (
                    <Col>
                    {getProductInColumn(
                        getFilteredProduct(product), 
                        NUMBER_OF_COLUMNS, 
                        column
                        ).map((product) => ( 
                    <Product 
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