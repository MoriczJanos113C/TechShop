import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../style/ProfilePage.css";

export function ProfilePage() {
    //hooks and contextes and navigate
    const { user } = useContext(UserContext);
    const { id: user_ID } = useParams();
    const [userOrders, setUserOrders] = useState([]);

    const navigate = useNavigate();

    //if the user want to check the other user's profile page he/she cant, because this checking the user's id and if he is changing it will bringing the user back to only his/her profile page
    useEffect(() => {
        if (user_ID != user.id) {
            navigate(`/profile/${user.id}`);
        }

        //getting all the orders what the user ordered by the user's id
        const fetchOrders = async () => {
            const { data: orders } = await axios.get(
                `http://localhost:8080/usersOrder/${user_ID}`
            );
            setUserOrders(orders);
        };
        fetchOrders();
    }, [user_ID]);

    return (
        <>
            <h1 className="headLine">Bejelentkezve: {user.username}</h1>
            <hr></hr>
            <h1 className="headLine">Rendeléseid</h1>
            {userOrders.map((pR) => (
                <div key={pR.id}>
                    <p className="info">Rendelt termékek</p>
                    <p className="info">{pR.itemName}</p>
                    <p className="info">Rendelési személyes információi</p>
                    <p className="info">{pR.contactInfo}</p>
                    <p className="info">Rendelési személyes információi</p>
                    <p className="info">{pR.totalCost} HUF</p>
                </div>
            ))}
        </>
    );
}
