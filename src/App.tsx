import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { routes } from './Routes';
import { Home } from './pages';
import { SignInPage } from './pages/SignIn';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.signin} element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
