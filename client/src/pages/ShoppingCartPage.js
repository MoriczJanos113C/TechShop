import React, { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ShoppingCartContext } from "../App";

export function ShoppingCartPage(){

    const [cart, setCart] = useContext(ShoppingCartContext);

    const removeProduct = (product) => {
        setCart(cart.filter(productInCart => productInCart !== product))
    }

    const ShoppingCartItem = ({ product, removeProduct }) => {
        return (
            <Row bg="light" expand="lg">
                <Col>
                    <img src="./logo192.png"/>
                </Col>
                <Col>
                    <Card.Title>
                        {product.name}
                    </Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                </Col>
                    <Col>
                        <Button variant="primary"
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
                <h2>Kosár tartalma ({cart.length} db) termék összesen</h2>
                </Col>
            </Row>

            {cart.map((product) => (
                    <ShoppingCartItem product={product} removeProduct={removeProduct}/>
                ))}
        </Container>
    );
};