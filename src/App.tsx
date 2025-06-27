import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './Routes';
import { Home, SignIn } from './pages';
import Login from './components/login';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.signin} element={<SignIn />} />
          <Route path={routes.signup} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
