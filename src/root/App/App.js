import './App.css';
import React from "react";
import Router from "root/router/Router";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "context/UserContext";
import MyNavbar from "pages/MyNavbar/MyNavbar";

const App = () => {
  return (
      <UserProvider>
        <BrowserRouter>
            <MyNavbar />
          <Router />
        </BrowserRouter>
      </UserProvider>
  );
};

export default App;