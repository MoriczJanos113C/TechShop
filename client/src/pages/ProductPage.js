import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from 'axios';
import { useContext, useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from "../App";
import { Container, Row, Col, Card, Button, Form, ToastContainer, Toast } from "react-bootstrap";

export function ProductPage({ sendId }) {


    const DEFAULT_FORM_OBJECT = {
        name:'',
        cost: 0,
        description:''
    };

    const [product, setProduct] = useState([]);
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const [user] = useContext(UserContext);
    const { productId } = useParams();

    useEffect(()=> {
        const getProduct = async () => {
            const { data: product } = await Axios.get(`http://localhost:8080/product/${productId}`);
            getProduct(product);
        };   
        getProduct();
    }, [productId])
    
    return (
        <div className="App">

            {product.map(ids => 
               <div key={ids.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{ids.name}</h5>
                        <p className="card-text">{ids.price}</p>
                        <p className="card-text">{ids.id}</p>
                    </div>
                </div>
                     
)}
        </div>
        
    )
}