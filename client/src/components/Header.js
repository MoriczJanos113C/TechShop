import React, { useContext } from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShoppingCartContext, UserContext } from '../App';
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import "../style/header.css"


export function Header() {

    const [cart] = useContext(ShoppingCartContext);
    const isLoggedIn = useIsLoggedIn();
    const isAdmin = useIsAdmin();
    const { user } = useContext(UserContext);

    return (
        <Navbar className="navbar" expand="lg">
            <Container>
                <Navbar.Brand>
                    {!isAdmin && <Link className="home" to="/products">Kezdőlap</Link>}
                </Navbar.Brand>

                {isLoggedIn && !isAdmin && <Link className="link" to={`/profile/${user.id}`}>Profil</Link>}
                {isAdmin && <Link className="link" to="/users">Felhasználók kezelése</Link>}





                {isAdmin && <Link className="link" to="/orders">Rendelések kezelése</Link>}

                {isAdmin && (<NavDropdown title="Termékek" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                        <Link className="link" to="/products">Termékek kezelése</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item><Link className="link" to="/create-product">Termék létrehozása</Link>
                    </NavDropdown.Item>
                </NavDropdown>)}

                {!isLoggedIn && <Link className="link" to="/">Bejelentkezés</Link>}
                {!isLoggedIn && <Link className="link" to="/register">Regisztráció</Link>}
                <Link className="link" to="/entries">Bejegyzések</Link>
                <Link className="link" to="/contacts">Elérhetőségek</Link>

                {!isAdmin && isLoggedIn && cart.length > 0 && <Link className="link" to="/cart">Kosár {cart.length}</Link>}
                {isLoggedIn && <Link className="logOut" to="/logout">Kijelentkezés</Link>}


            </Container>
        </Navbar>
    )
}