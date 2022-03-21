import React, { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../App";


export function ShoppingCartPage(){

    const [cart, setCart] = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    const totalCost = cart.reduce((sum, product) => sum+product.cost, 0)

    const removeProduct = (product) => {
        setCart(cart.filter(productInCart => productInCart !== product))
    }

    const ShoppingCartItem = ({ product, removeProduct }) => {
        return (
            <Row bg="light" expand="lg">
                <Col>
                    <img className="w-100" src={`http://localhost:8080/${product.image}`}/>
                </Col>
                <Col>
                    <Card.Title className="textOne">
                        {product.name}
                    </Card.Title>
                    <Card.Text className="textTwo">
                        {product.description}
                    </Card.Text>
                    <Card.Text className="textTwo">
                        {product.cost} HUF
                    </Card.Text>
                </Col>
                    <Col>
                        <Button variant="danger"
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
                <h2 className="cimsor">Kosár tartalma ({cart.length} db) termék összesen</h2>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                <h2 className="cimsor">A kosár összege {totalCost} HUF</h2>
                <Button variant="secondary" onClick={()=> navigate("/checkout")}>Vásárlás</Button>
                </Col>
            </Row>

            {cart.map((product) => (
                    <ShoppingCartItem product={product} removeProduct={removeProduct}/>
                ))}
        </Container>
    );
};