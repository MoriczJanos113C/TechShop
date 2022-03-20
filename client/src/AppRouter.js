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
import { EditProduct} from './pages/EditProduct';
import { ProductPage } from './pages/ProductPage';
import { CheckOutPage } from './pages/CheckOutPage';
import { EditUser } from './pages/EditUser';
import { UsersPage } from './pages/UsersPage';
import { useIsLoggedIn } from './hooks/useIsLoggedIn';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';

export const AppRouter = () => {

  const isAdmin = useIsAdmin();
  const isLoggedIn = useIsLoggedIn();

    return(
        <Router>
          <Header />
            <Routes>
              {isAdmin && (<Route path="/create-product" element={<CreateProductPage/>}/>)}
              {isAdmin && (<Route path="/products/:id" element={<EditProduct/>}/>)}

              {isAdmin && (<Route path="/users" element={<UsersPage/>}/>)}
              {!isAdmin && isLoggedIn && (<Route path="/users/:id" element={<EditUser/>}/>)}

              {isLoggedIn && (<Route path="/profile" element={<ProfilePage/>}/>)}
              
              {isAdmin && (<Route path="/orders" element={<OrdersPage/>}/>)}
              
              <Route path="/products/product/:id" element={<ProductPage/>}/>
              <Route path="/" element={<ProductsPage />}/>
              {isLoggedIn && (<Route path="/cart" element={<ShoppingCartPage />}/>)}
              {isLoggedIn && (<Route path="/checkout" element={<CheckOutPage />}/>)}
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/login" element={<LoginPage />}/>
              {isLoggedIn && (<Route path="/logout" element={<LogoutPage />}/>)}
              {isAdmin && (<Route path="/profile" element={<ProfilePage/>}/>)}
              
              
        </Routes>
        </Router>
    )
}