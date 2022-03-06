import './App.css';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { CreateProductPage } from './pages/CreateProductPage';
import {ProductsPage} from './pages/ProductsPage';
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { RegisterPage } from './pages/RegisterPage';

//modulok telepítése
//npm install react-bootstrap bootstrap@5.1.3
//npm install react-router-dom
//npm install axios


export const ShoppingCartContext = React.createContext();
export const UserContext = React.createContext();

function App() {

  const cartState = useState([]);
  const userState = useState({});

  return (
    <div className="App">
      <UserContext.Provider value={userState}>
      <ShoppingCartContext.Provider value={cartState}>
        <Router>
          <Header />
            <Routes>
              <Route path="/create-product" element={<CreateProductPage/>}/>
              <Route path="/" element={<ProductsPage />}/>
              <Route path="/cart" element={<ShoppingCartPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
        </Routes>
        </Router>
      </ShoppingCartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
