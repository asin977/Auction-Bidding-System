import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './Routes';
import { Home, Login, SignIn } from './pages';

import './App.css';

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
