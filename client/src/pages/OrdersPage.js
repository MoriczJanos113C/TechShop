import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { UserContext } from "../App";
import "../style/OrdersPage.css"


export function OrdersPage(){

    //hooks and contextes
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const NUMBER_OF_COLUMNS = 2;
    const {user} = useContext(UserContext);

    //will getting all the orders
    useEffect(() => {
        const fetchOrders = async () => {
            const { data: orders } = await axios.get("http://localhost:8080/orders");
            setOrders(orders);
        };
        fetchOrders();
    }, []);

    //to search the searchbar
    const onSearchChange = (e) => {
        setSearch(e.currentTarget.value);
    };

    //to set the searchbar for the users's name to search her/his order
    const getFilteredUsers = (orders) => {
        return orders.filter((order) => order.username.includes(search))
    }

    const getUsersInColumn = (orders, numberOfColumns, columns) => {
        return orders.filter((col, index) => index % numberOfColumns === columns);
    };


    //will delete an order if the button is clicked
    const deleteReview = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/deleteOrder/${id}`, {
        headers:{
            'Authorization': `Bearer ${user.token}`
        }
    });
    window.location.reload();
}

    return(
        <>
            <Form.Control className="input"
                        size="lg" 
                        type="text" 
                        value={search}
                        placeholder="Rendelés keresése felhasználónév szerint" 
                        onChange={onSearchChange}
                        />
                        <h1 className="headLine">Rendelések</h1> 
                {new Array(NUMBER_OF_COLUMNS).fill('').map((value, column) => (
                    <Col>    
                                       
                    {getUsersInColumn(
                        getFilteredUsers(orders), 
                        NUMBER_OF_COLUMNS, 
                        column
                        ).map((order) => ( 
                            <>  
                                <p className="information">Rendelés azonosítója: {order.id}</p>
                                        <p className="information">Felhasználónév: {order.username}</p>
                                        <p className="information">Felhasználó információi: {order.contactInfo}</p>
                                        <p className="information">Rendelt termékek: {order.items}</p>
                                        <Button onClick={(e) => deleteReview(e, order.id)} className="deleteBtn">Rendelés törlése</Button>      
                            </>
                        )
                    )}
                </Col>
            ))}
          </> 
    )
}