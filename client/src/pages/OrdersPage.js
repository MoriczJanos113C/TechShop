import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export function OrdersPage(){

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const NUMBER_OF_COLUMNS = 2;
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const { data: orders } = await axios.get("http://localhost:8080/orders");
            setOrders(orders);
        };
        fetchOrders();
    }, []);

    const onSearchChange = (e) => {
        setSearch(e.currentTarget.value);
    };

    const getFilteredUsers = (orders) => {
        return orders.filter((order) => order.username.includes(search))
    }

    const getUsersInColumn = (orders, numberOfColumns, columns) => {
        return orders.filter((col, index) => index % numberOfColumns === columns);
    };

    const deleteReview = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/deleteOrder/${id}`, {
        headers:{
            'Authorization': `Bearer ${user.token}`
        }
    });
    navigate("/orders")
}

    return(
        <>
            <Form.Control 
                        size="lg" 
                        type="text" 
                        value={search}
                        className="mb-4 mt-4"
                        placeholder="Rendelés keresése" 
                        onChange={onSearchChange}
                        /> 
                {new Array(NUMBER_OF_COLUMNS).fill('').map((value, column) => (
                    <Col>    
                          <h1>Rendelések</h1>              
                    {getUsersInColumn(
                        getFilteredUsers(orders), 
                        NUMBER_OF_COLUMNS, 
                        column
                        ).map((order) => ( 
                            <>  
                                        <p>Rendelés azonosítója: {order.id}</p>
                                        <p>Felhasználónév: {order.username}</p>
                                        <p>Felhasználó információi: {order.contactInfo}</p>
                                        <p>Rendelt termékek: {order.items}</p>
                                        <Button onClick={(e) => deleteReview(e, order.id)} variant="danger">Rendelés törlése</Button>
                                    
                            </>
                        )
                    )}
                </Col>
            ))}
          </>  
    )
}