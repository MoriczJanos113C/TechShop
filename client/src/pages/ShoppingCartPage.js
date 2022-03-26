import React, { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../App";
import "../style/ShoppingCartPage.css"


export function ShoppingCartPage(){

    const [cart, setCart] = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    const totalCost = cart.reduce((sum, product) => sum+product.cost, 0)

    const removeProduct = (product) => {
        setCart(cart.filter(productInCart => productInCart !== product))
    }

    useEffect(() => {
        if(cart.length === 0){
            navigate("/")
        }
    })

    const ShoppingCartItem = ({ product, removeProduct }) => {
        return (
            <Row className="pruductCards" bg="light" expand="lg">
                <Col>
                    <img className="w-100" src={`http://localhost:8080/${product.image}`}/>
                </Col>
                <Col>
                    <Card.Title className="title">
                        {product.name}
                    </Card.Title>
                    <Card.Text className="cost">
                        {product.cost} HUF
                    </Card.Text>
                </Col>
                    <Col>
                        <Button className="deleteBtn"
                            onClick={() => removeProduct(product)} removeProduct={removeProduct}>
                            Eltávolítás a kosárból
                        </Button>
                    </Col>
            </Row>
        )
    }

    return(
        <Container>
            <Row className="mb-4">
                <Col>
                <h2 className="headLine1">Kosár tartalma ({cart.length} db) termék összesen</h2>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                <h2 className="headLine2">A kosár összege {totalCost} HUF</h2>
                <Button variant="secondary" onClick={()=> navigate("/checkout")}>Vásárlás</Button>
                </Col>
            </Row>

            {cart.map((product) => (
                    <ShoppingCartItem product={product} removeProduct={removeProduct}/>
                ))}
        </Container>
    );
};