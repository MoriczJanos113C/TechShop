import { useContext, useEffect } from "react"
import React from "react";
import { ShoppingCartContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
export function LogoutPage(){

    const { setUser} = useContext(UserContext);

    const navigate = useNavigate();
    const [cart, setCart] = useContext(ShoppingCartContext);

    const logOutCart = () => {
        setCart([]);
    }
    useEffect(() => {
        setUser({});
        logOutCart();
        navigate("/");
    }, [])


    return(
        <div></div>
    )
}