import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './Routes';
import { Home, SignIn } from './pages';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.signin} element={<SignIn />} />
          <Route path="/signup" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
