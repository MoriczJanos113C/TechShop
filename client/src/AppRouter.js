import React from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { CreateProductPage } from './pages/CreateProductPage';
import { ProductsPage } from './pages/ProductsPage';
import { Header } from "./components/Header"
import { useIsAdmin } from "./hooks/useIsAdmin";
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { LogoutPage } from './pages/LogoutPage';
import { EditProduct } from './pages/EditProduct';
import { ProductPage } from './pages/ProductPage';

export const AppRouter = () => {

  const isAdmin = useIsAdmin();


    return(
        <Router>
          <Header />
            <Routes>
              {isAdmin && (<Route path="/create-product" element={<CreateProductPage/>}/>)}
              <Route path="/products/:id" element={<EditProduct/>}/>
              <Route path="/products/product/:id" element={<ProductPage/>}/>
              <Route path="/" element={<ProductsPage />}/>
              <Route path="/cart" element={<ShoppingCartPage />}/>
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/logout" element={<LogoutPage />}/>
        </Routes>
        </Router>
    )
}