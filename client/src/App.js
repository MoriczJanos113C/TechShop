import './App.css';
import React, { useEffect, useState } from 'react';
import { AppRouter } from './AppRouter';

//modulok telepítése
//npm install react-bootstrap bootstrap@5.1.3
//npm install react-router-dom
//npm install axios


export const ShoppingCartContext = React.createContext();
export const UserContext = React.createContext();

function App() {

  const cartState = useState([]);

  const userState = useState(() => {
    const userInLocalStorage = localStorage.getItem('user');
    console.log(JSON.parse(userInLocalStorage));
    return userInLocalStorage ? JSON.parse(userInLocalStorage) : {};
  });
  
  console.log(userState)
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userState[0]));
  }, userState)

  

  return (
    <div className="App">
      <UserContext.Provider value={{token: userState[0].token, user:userState[0].user, setUser: userState[1]}}>
      <ShoppingCartContext.Provider value={cartState}>
        <AppRouter />
      </ShoppingCartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
