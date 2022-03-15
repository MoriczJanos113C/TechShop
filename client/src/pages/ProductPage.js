import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, ToastContainer, Toast } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ShoppingCartContext, UserContext } from '../App';
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import "../style/style.css"

export function ProductPage(){

    const [product, setProduct] = useState([]);
    const NUMBER_OF_COLUMNS = 2;
    const [cart, setCart] = useContext(ShoppingCartContext);
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


    const addProductToCart = (product) => {
        setCart([...cart, {...product}]);
        setShowToast(true);
    };


 //ide barmit tehetesz, diveket akár ki is cserelheted masra 44-61es sorig, ez jelenik meg majd amit az also returnba be injektálsz (91.sor)
    const Product = ({ isAdmin, isLoggedIn, product, addProductToCart }) => {
        return (
            <Card key={product.id} >
                <Card.Img style={{ width: '6rem' }} variant="top" src={`http://localhost:8080/${product.image}`} />
                <Card.Body className="card">
                    <Card.Title className="textOne">{product.name}</Card.Title>
                    <Card.Text className="textTwo">
                        {product.description} 
                    </Card.Text>
                    <Card.Text className="textTwo">
                        {product.cost} HUF
                    </Card.Text>
                    {!isAdmin && isLoggedIn && (
                        <Button variant="success" onClick={() => addProductToCart(product)}>Kosárba</Button>
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
            {product.map(p =>  
                <Product 
                    isLoggedIn={isLoggedIn}
                    isAdmin={user?.role==="admin"}
                    key={p.id}
                    product={p} 
                    addProductToCart={addProductToCart}/>
                )}
                    
    
            </Row>
        </Container>
        </>
    );
};