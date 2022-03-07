import { useContext } from "react";
import { UserContext } from "../App";

export const useIsAdmin = () => {
    const [user] = useContext(UserContext);
    return user.user?.role === "admin";
}