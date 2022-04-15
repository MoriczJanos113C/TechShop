import { useContext, useEffect, useState } from "react";
import { Col, Form, Button, Container, Row } from "react-bootstrap";
import Axios from "axios";
import React from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import "../style/EditProduct.css"


const DEFAULT_FORM_OBJECT = {
        name:'',
        cost: 0,
        category:'',
        description:'',
    };

export function EditProduct(){
    

    
    const {user} = useContext(UserContext);
    const { id: productId } = useParams();
    const navigate = useNavigate();


    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);

    const [nameError, setNameError] = useState("");
    const [costError, setCostError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [categoryError, setCategoryError] = useState("");

    useEffect(()=> {
        const getProduct = async () => {
            const { data: product } = await Axios.get(`http://localhost:8080/products/${productId}`);
            console.log(product)
            setForm({
                name: product[0].name, 
                cost: product[0].cost,
                category: product[0].category,
                description: product[0].description,
                file: product[0].image,
            });
            
        };   
  
        getProduct();
    }, [])



    const updateProduct = async (e) => {
        e.preventDefault();
        if(nameError === "" && categoryError === "" && descriptionError === "" && costError === "" && form.name.trim() != "" && form.category.trim() != "" && form.description.trim() != ""){
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("cost", form.cost);
        formData.append("category", form.category);
        formData.append("description", form.description);
        formData.append("file", form.file);
    
        await Axios.put(`http://localhost:8080/products/${productId}`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`,
            }
        });
        setForm(DEFAULT_FORM_OBJECT);
        navigate("/products");
        }
    };

    const deleteProduct = () => {
            Axios.delete(`http://localhost:8080/deleteProduct/${productId}`, {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        });
        navigate("/products")
    }

    const updateFormValue = (key) => (e) => {
        
        setForm({
            ...form,
            [key]: e.target.value,
        });
        console.log(key,form,e.target.value)
    };

    const updateFormFileValue = (key) => (e) => {
        console.log(key)
        setForm({
            ...form,
            [key]: e.target.files[0],
        });
    };


    
    useEffect(() => {
        checkValid();
    },[form])
    
    const checkValid = () => {

            
        if(!String(form.name)
        .match(
            /^[a-zA-z\u00C0-\u024F0-9 .!?,"']{4,}$/
        )&& form.name.trim() != "")
        setNameError("Nem megfelelő termék név")
        else{
            setNameError("");
        }

        if(!String(form.category)
        .match(
            /^[a-zA-z\u00C0-\u024F .!?,"']{4,}$/
        )&& form.category.trim() != "")
        setCategoryError("Nem megfelelő termék kategória")
        else{
            setCategoryError("");
        }

        if(!String(form.cost)
        .match(
            /^[0-9]{1,}$/
        )&& form.cost.trim() != "")
        setCostError("Nem megfelelő ár")
        else{
            setCostError("");
        }
        
        if(!String(form.description)
        .match(
            /^[a-zA-z\u00C0-\u024F0-9 .!?,"']{10,}$/
        )&& form.description.trim() != "")
        setDescriptionError("Nem megfelelő vélemény")
        else{
            setDescriptionError("");
        }
    }
console.log(form.file)
    return(

        
        <div className="product">
            
            
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                    <h1 className="headLine">Termék szerkesztése</h1>
                    
                        <Form onSubmit={updateProduct}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Név</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormValue("name")}
                                            value={form.name} 
                                            type="name" placeholder="ide írd a termék nevét" />
                                </Form.Group>
                                {nameError && <p>{nameError}</p>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Kategória</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormValue("category")}
                                            value={form.category} 
                                            type="text" placeholder="ide írd a termék kategóriáját" />
                                </Form.Group>
                                {categoryError && <p>{categoryError}</p>}
                                <Form.Group className="mb-3">
                                        <Form.Label>Ár</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("cost")}
                                            value={form.cost} 
                                            type="number" 
                                            placeholder="Ide írd a termék árát" />
                                </Form.Group>
                                {costError && <p>{costError}</p>}
                                <Form.Group className="mb-3" >
                                    <Form.Label>Termék leírása</Form.Label>
                                        <Form.Control className="input"
                                            onChange={updateFormValue("description")}
                                            value={form.description} 
                                            type="text" as="textarea" 
                                            rows={3}/>
                                </Form.Group>
                                {descriptionError && <p>{descriptionError}</p>}
                                <Form.Group className="mb-3">
                                    <Form.Label>Kép</Form.Label>
                                    <Form.Control className="input"
                                            onChange={updateFormFileValue("file")} 
                                            value={form.image}
                                            name="image"
                                            type="file" />
                                </Form.Group>
                                <Button className="submitBtn" type="submit">
                                   Mentés
                                </Button><br /><br />
                                <Button className="deleteBtn" onClick={deleteProduct}>Törlés</Button>
                            </Form>
                        </Col>
                    <Col></Col>
                </Row>
            
        </div>
        
    );
};