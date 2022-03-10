import { useContext } from "react";
import { UserContext } from "../App";

export const useIsLoggedIn = () => {
    const {token} = useContext(UserContext);
    return !!token;
}