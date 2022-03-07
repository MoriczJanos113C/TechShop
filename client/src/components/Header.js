import React, { useContext } from "react";
import { Container, Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShoppingCartContext, UserContext } from '../App';
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

export function Header(){

    const [cart] = useContext(ShoppingCartContext);
    const [user] = useContext(UserContext);
    const isLoggedIn = useIsLoggedIn();

    return(
        <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
            <Navbar.Brand>
                <Link to="/">Kezdőlap |||| Bejelentkezve: {user.user?.username}-ként :D</Link>
            </Navbar.Brand>
            {!isLoggedIn && <Link to="/login">Bejelentkezés</Link>}
            {!isLoggedIn && <Link to="/register">Regisztráció</Link>}
            {isLoggedIn && <Link to="/logout">Kijelentkezés</Link>}
            {isLoggedIn && <Link to="/cart">Kosár {cart.length}</Link>}
  </Container>
</Navbar>
    )
}