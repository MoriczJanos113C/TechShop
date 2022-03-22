import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export function ProfilePage(){

    const {user} = useContext(UserContext);
    const {id: user_ID} = useParams()
    const [userOrders, setUserOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(user_ID != user.id){
            navigate("/")
        }
        const fetchOrders = async () => {
            const { data: orders } = await axios.get(`http://localhost:8080/usersOrder/${user_ID}`);
            setUserOrders(orders);
            console.log(orders)
        };
        fetchOrders();
    }, [user_ID]);

    


    return(
        <><h1>Bejelentkezve: {user.username}</h1>
        <h1>Rendeléseid</h1>
                {userOrders.map(pR =>  
                <div key={pR.id}>                   
                    <h1>{pR.username}</h1>
                    <p>{pR.items}</p>
                    <p>{pR.contactInfo}</p>
                </div>
                )}         
          </>  
    )
}