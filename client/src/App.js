import './App.css';
import React, { useEffect, useState } from 'react';
import { AppRouter } from './AppRouter';


//creating a shoppingcart context
export const ShoppingCartContext = React.createContext();
//creating a user context
export const UserContext = React.createContext();
//creating a confirmation context
export const ConfirmationContext = React.createContext();

function App() {

  const confirmationState = useState(null);

  //localstorage for the cart
  const cartState = useState(() => {
    const cartInLocalStorage = localStorage.getItem('cart');
    return cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];
  });

  //localstorage for the user
  const userState = useState(() => {
    const userInLocalStorage = localStorage.getItem('user');
    return userInLocalStorage ? JSON.parse(userInLocalStorage) : {};
  });
  

  //will save the user's datas to localstorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userState[0]));
  }, userState)

  //will save the cart's datas to localstorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState[0]));
  }, cartState)

  return (
    <div className="App">
      <UserContext.Provider value={{token: userState[0].token, user:userState[0].user, setUser: userState[1]}}>
        <ShoppingCartContext.Provider value={cartState}>
          <ConfirmationContext.Provider value={confirmationState}>
            <AppRouter />
          </ConfirmationContext.Provider> 
        </ShoppingCartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
