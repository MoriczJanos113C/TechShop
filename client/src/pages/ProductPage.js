import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Card, Button, Form, ToastContainer, Toast } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ShoppingCartContext, UserContext } from '../App';
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import "../style/style.css"
import { updateFormValue } from "./CreateProductPage";

const DEFAULT_FORM_OBJECT = {
    rating:'',
    description:''
};
export function ProductPage(){


    const [product, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewByProduct, setReviewByProduct] = useState([]);
    const { id: reviewID } = useParams()
    

    
    const [cart, setCart] = useContext(ShoppingCartContext);
    const [showToast, setShowToast] = useState(false);
    const {user} = useContext(UserContext);
    const { id: productID } = useParams()
    const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
    const isAdmin = useIsAdmin();
    const isLoggedIn = useIsLoggedIn();


    useEffect(() => {
        const fetchProduct = async () => {
            const { data: prods } = await axios.get(`http://localhost:8080/products/product/${productID}`);
            setProduct(prods);
            
        };
        fetchProduct();
    }, [productID]);

    
    useEffect(() => {
        const fetchProduct = async () => {
            const { data: review } = await axios.get(`http://localhost:8080/productReviews/${reviewID}`);
            setReviewByProduct(review);
        
            };
        fetchProduct();
    }, [reviewID]);

    

    const addProductToCart = (product) => {
        setCart([...cart, {...product}]);
        setShowToast(true);
    };

    const addReview = async (e) => {
        e.preventDefault();
        const {data: reviews } = await axios.post("http://localhost:8080/review", { 
        product_id: productID,
        user_id: user.id,
        username: user.username,
        description: form.description,
        rating: form.rating
        });
        setReviews(reviews.id);
        window.location.reload();
    };

    const deleteReview = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8080/deleteReview/${id}`, {
        headers:{
            'Authorization': `Bearer ${user.token}`
        }
    });
    window.location.reload();
}


 //ide barmit tehetesz, diveket akár ki is cserelheted masra 44-61es sorig, ez jelenik meg majd amit az also returnba be injektálsz (91.sor)
    const Product = ({ isAdmin, isLoggedIn, product, addProductToCart }) => {
        return (
            <Card key={product.id} >
                <Card.Img style={{ width: '6rem' }} variant="top" src={`http://localhost:8080/${product.image}`} />
                <Card.Body className="card">
                    <Card.Title className="textOne">{product.name}</Card.Title>
                    <Card.Text className="textTwo">
                        {product.description} 
                    </Card.Text>
                    <Card.Text className="textTwo">
                        {product.cost} HUF
                    </Card.Text>
                    {!isAdmin && isLoggedIn && (
                        <Button variant="success" onClick={() => addProductToCart(product)}>Kosárba</Button>
                    )}
                </Card.Body>
            </Card>
        )
    }

    return(
        <>
        <ToastContainer 
        style={{"zIndex": "1"}}
        className="p-3 position-fixed" 
        position={"top-center"}>
          <Toast 
            onClose={() => setShowToast(false)} 
            show={showToast} 
            delay={2000} 
            autohide>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Sikeresen bekerült a kosárba</strong>
            </Toast.Header>
            <Toast.Body>Termék hozzáadva</Toast.Body>
          </Toast>
        </ToastContainer>


    
        <Container>
            <Row>
            {product.map(p =>  
                <Product 
                    isLoggedIn={isLoggedIn}
                    isAdmin={user?.role==="admin"}
                    key={p.id}
                    product={p} 
                    addProductToCart={addProductToCart}/>
                )}
            <h1>Vélemények</h1>
            {reviewByProduct.map(pR =>  
                <div key={pR.id}>
                    {isAdmin && (
                        
                        <Button onClick={(e) => deleteReview(e, pR.id)} variant="danger">Törlés</Button>
                    )}
                    
                    <h1>{pR.username}</h1>
                    <h2>{pR.rating}</h2>
                    <p>{pR.description}</p>
                    
                </div>
                )}
    
            
    
            </Row>
        </Container>
                
                    
                    
                    <Container>
                        {!isAdmin && isLoggedIn &&(
                            <Form onSubmit={(e) => addReview(e)}>
                                   <Form.Group className="mb-3">
                                        <Form.Label className="textTwo">Rating</Form.Label>
                                        <Form.Control 
                                                onChange={updateFormValue("rating", form, setForm)}                       
                                                placeholder="rating"
                                                type="number"            
                                                />
                                    </Form.Group>
    
                                    <Form.Group className="mb-3">
                                            <Form.Label className="textTwo">Termék vélemény írás</Form.Label>
                                            <Form.Control 
                                                onChange={updateFormValue("description", form, setForm)}
                                                value={form.description} 
                                                placeholder="Leírás" />
                                    </Form.Group>
                                    <Button variant="success" type="submit">
                                        Vélemény elküldése
                                     </Button>
                                   
                                </Form>
                        )}
                     
                                
                    </Container>
                    
                    
                
        </>
    );
};