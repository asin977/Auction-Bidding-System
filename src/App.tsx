import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './Routes';
import { SignIn } from './pages';
import {Home} from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.signin} element={<SignIn />} />
          <Route path={routes.login} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
