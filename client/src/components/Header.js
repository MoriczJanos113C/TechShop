import React, { useContext } from "react";
import { Container, Navbar} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from '../App';
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import "../style/style.css"


export function Header(){

    const [cart] = useContext(ShoppingCartContext);
    const isLoggedIn = useIsLoggedIn();
    const isAdmin = useIsAdmin();
    return(
        <Navbar className="navbar" expand="lg">
        <Container>
            <Navbar.Brand>
                <Link className="textOne" to="/">Kezdőlap</Link>
            </Navbar.Brand>
            {isAdmin && <Link className="textTwo" to="/create-product">Termék létrehozása</Link>}
            {isAdmin && <Link className="textTwo" to="/users">Felhasználók kezelése</Link>}
            {!isLoggedIn && <Link className="textTwo" to="/login">Bejelentkezés</Link>}
            {!isLoggedIn && <Link className="textTwo" to="/register">Regisztráció</Link>}
            {isLoggedIn && <Link className="logOut" to="/logout">Kijelentkezés</Link>}
            {!isAdmin && isLoggedIn && <Link className="textTwo" to="/cart">Kosár {cart.length}</Link>}           
                
  </Container>
</Navbar>
    )
}