import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { useIsAdmin } from "../hooks/useIsAdmin";

const DEFAULT_FORM_OBJECT = {
    title:'',
    description:'',
};

export function EntriesPage(){

    
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const {user} = useContext(UserContext);
    const isAdmin = useIsAdmin();

    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    

    


    const checkValid = () => {

            
        if(!String(form.title)
        .match(
            /^[a-zA-Z0-9]{3,}$/
        )&& form.title.trim() != "")
        setTitleError("Nem megfelelő bejegyzés cím")
        else{
            setTitleError("");
        }

        if(!String(form.description)
        .match(
            /^[a-zA-Z0-9]{3,}$/
        )&& form.description.trim() != "")
        setDescriptionError("Nem megfelelő bejegyzés leírás")
        else{
            setDescriptionError("");
        }
        
    }

    useEffect(() => {
        const fetchEntries = async () => {
            const { data: ent } = await axios.get("http://localhost:8080/entries");
            setEntries(ent);
        };
        fetchEntries();
    }, []);


    const addEntries = async (e) => {
        e.preventDefault();
        if(titleError === "" && descriptionError === "" && form.title.trim() != "" && form.description.trim() != ""){
        const {data: ent } = await axios.post("http://localhost:8080/entries", { 
        user_id: user.id,
        username: user.username,
        title: form.title,
        description: form.description,
        });
        setEntries(ent.id);
        window.location.reload();
        }
    };

    const deleteEntries = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/deleteEntries/${id}`, {
        headers:{
            'Authorization': `Bearer ${user.token}`
        }
    });
    window.location.reload();
}

    const updateFormValue = (key) => (e) => {
        
        setForm({
            ...form,
            [key]: e.target.value,
        });
        console.log(key,form,e.target.value)
    };

    useEffect(() => {
        checkValid();
    },[form])

    return(
        <>
        <Container>
                 <Form onSubmit={addEntries}>
                                    <Form.Group className="mb-3">
                                        <Form.Label >Bejegyzés címe</Form.Label>
                                        <Form.Control className="input"
                                                onChange={updateFormValue("title")}
                                                value={form.title} 
                                                placeholder="rating" />
                                    </Form.Group>
                                    {titleError && <p>{titleError}</p>}
                                    <Form.Group className="mb-3">
                                            <Form.Label >Bejegyzés írása</Form.Label>
                                            <Form.Control className="input"
                                                onChange={updateFormValue("description")}
                                                value={form.description} 
                                                placeholder="Leírás" />
                                    </Form.Group>
                                    {descriptionError && <p>{descriptionError}</p>}
                                    <Button className="reviewBtn" type="submit">
                                        Bejegyzés elküldése
                                    </Button>
                                </Form>
            </Container>
                       
                   
                

        
            {entries?.map(ent =>  
                <Container>
                <h1 key={ent.id}>{ent.title}</h1>
                <h2>{ent.description}</h2>
                    {isAdmin && (
                    <>
                    
                        <Button onClick={(e) => deleteEntries(e, ent.id)} className="deleteBtn">Törlés</Button>
                        <p>.</p>
                        <Link className="editLink" to={`/entries/${ent.id}`}>Bejegyzés Szerkesztés</Link>
                        
                        <p>Bejegyzést írta: {ent.username}</p>
                        </>     
                )}
        
            
            
                
            
        </Container> 
        )}
        </>
            
        
        
        
    )
}