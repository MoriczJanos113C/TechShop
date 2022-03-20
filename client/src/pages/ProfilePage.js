import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";

export function ProfilePage(){

    const {user} = useContext(UserContext);
    const {id: ID} = useParams();
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data: orders } = await axios.get(`http://localhost:8080/userOrders/${ID}`);
            setUserOrders(orders);
        };
        fetchOrders();
    }, []);




    return(
        <><h1>Bejelentkezve: {user.username}</h1>
        <h1>Rendeléseid</h1>
                {userOrders.map(pR =>  
                <div key={pR.id}>                   
                    <h1>{pR.username}</h1>
                    <h2>{pR.items}</h2>
                    <h2>{pR.contactInfo}</h2>
                </div>
                )}
                                        
                                    
                           
                        
          </>  
    )
}