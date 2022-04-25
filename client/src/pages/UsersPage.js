import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/UsersPage.css"

export function UsersPage(){

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const NUMBER_OF_COLUMNS = 2;

    useEffect(() => {
        const fetchUsers = async () => {
            const { data: users } = await axios.get("http://localhost:8080/users");
            setUsers(users);
        };
        fetchUsers();
    }, []);

    const onSearchChange = (e) => {
        setSearch(e.currentTarget.value);
    };

    const getFilteredUsers = (users) => {
        return users.filter((user) => user.username.includes(search))
    }

    const getUsersInColumn = (users, numberOfColumns, columns) => {
        return users.filter((col, index) => index % numberOfColumns === columns);
    };

    return(
        <div className="App">
            <Col>
                    <Form.Control className="input"
                        size="lg" 
                        type="text" 
                        value={search}
                        placeholder="Felhasználók keresése" 
                        onChange={onSearchChange}
                        />
                </Col>
                {new Array(NUMBER_OF_COLUMNS).fill('').map((value, column) => (
                    <Col>
                    {getUsersInColumn(
                        getFilteredUsers(users), 
                        NUMBER_OF_COLUMNS, 
                        column
                        ).map((user) => ( 
                            <>
                            <p className="information">Felhasználónév: {user.username}</p>
                            <Link className="editLink" to={`/users/${user.id}`}>Szerkesztés</Link>
                            <p>----------------------------------------------</p>
                            </>
                        )
                    )}
                </Col>
            ))}
            </div>
    )
}