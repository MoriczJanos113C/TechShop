import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

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
            <Form.Control 
                        size="lg" 
                        type="text" 
                        value={search}
                        className="mb-4 mt-4"
                        placeholder="Felhasználó keresése" 
                        onChange={onSearchChange}
                        />
                {new Array(NUMBER_OF_COLUMNS).fill('').map((value, column) => (
                    <Col>
                    {getUsersInColumn(
                        getFilteredUsers(users), 
                        NUMBER_OF_COLUMNS, 
                        column
                        ).map((user) => ( 
                            <>
                            <p>{user.username}</p>
                            <Link className="textTwo" to={`/users/${user.id}`}>Szerkesztés</Link>
                            </>
                        )
                    )}
                </Col>
            ))}
            </div>
    )
}