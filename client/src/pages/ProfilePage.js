import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../style/ProfilePage.css"

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
        <><h1 className="headLine">Bejelentkezve: {user.username}</h1>
                        <hr></hr>    
        <h1 className="headLine">Rendeléseid</h1>
                {userOrders.map(pR =>  
                <div key={pR.id}>  
                    <p className="info">Rendelt termékek</p>
                    <p className="info">{pR.itemName}</p>
                    <p className="info">Rendelési személyes információi</p>
                    <p className="info">{pR.contactInfo}</p>
                    <p className="info">Rendelési személyes információi</p>
                    <p className="info">{pR.totalCost} HUF</p>
                </div>
                )}         
          </>  
    )
}