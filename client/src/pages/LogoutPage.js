import { useContext, useEffect } from "react"
import React from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
export function LogoutPage(){

    const { setUser} = useContext(UserContext);
    console.log(setUser);
    const navigate = useNavigate();


    useEffect(() => {
        setUser({});
        navigate("/");
    }, [])


    return(
        <div></div>
    )
}