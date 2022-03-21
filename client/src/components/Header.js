import React, { useContext } from "react";
import { Container, Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from '../App';
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import "../style/header.css"


export function Header(){

    const [cart] = useContext(ShoppingCartContext);
    const isLoggedIn = useIsLoggedIn();
    const isAdmin = useIsAdmin();
    
    return(
        <Navbar className="navbar" expand="lg">
        <Container>
            <Navbar.Brand>
            {!isAdmin && <Link className="home" to="/">Kezdőlap</Link>}
             
                
            </Navbar.Brand>
            {isLoggedIn && !isAdmin && <Link className="link" to="/profile">Profil</Link>}           
            {isAdmin && <Link className="link" to="/users">Felhasználók kezelése</Link>}
            {isAdmin && <Link className="link" to="/">Termékek kezelése</Link>}
            {isAdmin && <Link className="link" to="/orders">Rendelések kezelése</Link>}
            {!isLoggedIn && <Link className="link" to="/login">Bejelentkezés</Link>}
            {!isLoggedIn && <Link className="link" to="/register">Regisztráció</Link>}
            {isLoggedIn && <Link className="logOut" to="/logout">Kijelentkezés</Link>}
            {!isAdmin && isLoggedIn && <Link className="link" to="/cart">Kosár {cart.length}</Link>}           
                
  </Container>
</Navbar>
    )
}