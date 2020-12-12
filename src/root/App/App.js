import './App.css';
import React from "react";
import Router from "root/router/Router";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "context/UserContext";

const App = () => {
  return (
      <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
  );
};

export default App;