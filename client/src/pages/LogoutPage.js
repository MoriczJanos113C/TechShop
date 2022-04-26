import { useContext, useEffect } from "react"
import React from "react";
import { ShoppingCartContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";


export function LogoutPage(){

    //contextes, navigate
    const { setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [cart, setCart] = useContext(ShoppingCartContext);

    //if the user is logging out the products what he/she chosen will disappear
    //so if she/he logging in her/his cart will be empty
    const logOutCart = () => {
        setCart([]);
    }

    //the datas what is sent to the localstorage will removed after he/she clicked the logout button and called the logOutCart method too
    useEffect(() => {
        setUser({});
        logOutCart();
        navigate("/");
    }, [])


    return(
        <div></div>
    )
}