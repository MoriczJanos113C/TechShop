import React, { useContext } from "react";
import { Container, Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShoppingCartContext, UserContext } from '../App';

export function Header(){

    const [cart] = useContext(ShoppingCartContext);
    const [user] = useContext(UserContext);
    

    return(
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand>
                <Link to="/">Kezdőlap {user.user?.username}</Link>
            </Navbar.Brand>
            <Link to="/cart">Cart {cart.length}</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
  </Container>
</Navbar>
    )
}