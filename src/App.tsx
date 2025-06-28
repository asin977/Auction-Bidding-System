import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './Routes';
import { Home, SignIn } from './pages';

function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.signin} element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 813df75 (feat:Implemented the sign-in component)
  );
}

export default App;
